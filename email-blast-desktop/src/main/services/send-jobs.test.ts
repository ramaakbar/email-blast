import { afterEach, describe, expect, it } from "vitest";
import { Clock, Effect, Exit, Fiber, Latch, Option, Result } from "effect";
import { TestClock } from "effect/testing";
import { writeFileSync } from "fs";
import { join } from "path";
import { createServer } from "net";
import type { DatabaseSync } from "node:sqlite";
import { SMTPServer } from "smtp-server";
import type { SendJob, SendStartPayload } from "../../shared/ipc";
import { SETTING_KEYS } from "../../shared/settings";
import { LibreOfficeFailed, makeGenerateJobService, type GenerateEnv } from "./generate-jobs";
import { makeProgressHub } from "./progress-hub";
import {
  InvalidSendRequest,
  makeSendJobService,
  SendJobNotFound,
  type SendJobServiceShape,
} from "./send-jobs";
import {
  AttachmentNotFound,
  makeSmtpService,
  SmtpConnectFailed,
  SmtpProfileNotFound,
  SmtpSendFailed,
  type SmtpServiceShape,
} from "./smtp";
import { makeSqliteRepo, openDatabase } from "./sqlite-repo";
import { tempDir } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): the full send lifecycle with TestClock
 * and a captured local SMTP server - retry schedule timing, live pacing
 * gate changes, pause/resume, cancel, cursor persistence, restart-resume
 * on the same database, and the quit Latch losing at most the in-flight
 * recipient. The run loop's every delay goes through `Effect.sleep`, so
 * the TestClock advances sends deterministically while the real SMTP
 * traffic lands on the server.
 */

const SERVERS: SMTPServer[] = [];

afterEach(async () => {
  await Promise.all(
    SERVERS.splice(0).map(
      (server) => new Promise<void>((resolve) => server.close(() => resolve())),
    ),
  );
});

/**
 * A real SMTP server on an ephemeral port that accepts every credential
 * and captures each accepted message. Addresses listed in `reject` are
 * refused at RCPT, so a send fails deterministically; `attempts` counts
 * every RCPT (accepted or rejected) - the retry-schedule probe.
 */
async function startCapturingServer(
  reject: readonly string[] = [],
): Promise<{ port: number; captured: string[]; reject: Set<string>; attempts: () => number }> {
  const captured: string[] = [];
  const rejectSet = new Set(reject);
  let attempts = 0;
  const server = new SMTPServer({
    hideSTARTTLS: true,
    allowInsecureAuth: true,
    onAuth(auth, _session, callback) {
      callback(null, { user: auth.username });
    },
    onRcptTo(rcpt, _session, callback) {
      attempts += 1;
      if (rejectSet.has(rcpt.address)) {
        callback(new Error("mailbox unavailable"));
        return;
      }
      callback(null);
    },
    onData(stream, _session, callback) {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("end", () => {
        captured.push(Buffer.concat(chunks).toString("utf8"));
        callback(null);
      });
    },
  });
  SERVERS.push(server);
  await new Promise<void>((resolve, rejectListen) => {
    server.on("error", rejectListen);
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.server.address();
  if (address === null || typeof address === "string") throw new Error("No ephemeral port");
  return { port: address.port, captured, reject: rejectSet, attempts: () => attempts };
}

/** A local port that nothing listens on - connections are refused instantly. */
async function closedPort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  if (address === null || typeof address === "string") throw new Error("No ephemeral port");
  const { port } = address;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return port;
}

const RECIPIENT_ROWS = [
  {
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: null,
    metadata: { no: "001" },
    importBatch: "b1",
  },
  {
    name: "Sari Putri",
    email: "sari@example.com",
    phone: null,
    metadata: { no: "002" },
    importBatch: "b1",
  },
  {
    name: "Andi Wijaya",
    email: "andi@example.com",
    phone: null,
    metadata: { no: "003" },
    importBatch: "b1",
  },
];

/** Inserts recipients and returns their ids in insertion order (rowid order). */
function seedRecipients(db: DatabaseSync): string[] {
  Effect.runSync(makeSqliteRepo(db).insertRecipients(RECIPIENT_ROWS));
  return (db.prepare("SELECT id FROM recipients ORDER BY rowid").all() as { id: string }[]).map(
    (row) => row.id,
  );
}

/** The generate env seam; the send tests never run a generate job. */
function stubGenerateEnv(): GenerateEnv {
  return {
    findLibreOffice: () => null,
    convertDocxToPdf: () =>
      Effect.fail(new LibreOfficeFailed({ message: "not used in send tests" })),
    outputDir: () => Effect.succeed(tempDir()),
  };
}

interface Svc {
  db: DatabaseSync;
  repo: ReturnType<typeof makeSqliteRepo>;
  service: SendJobServiceShape;
  events: Array<Record<string, unknown>>;
  quitLatch: Latch.Latch;
  generateJobId: string;
  recipientIds: string[];
  port: number;
  captured: string[];
  reject: Set<string>;
  attempts: () => number;
  /** How many times the SMTP send seam was invoked (per-attempt probe). */
  sendCalls: () => number;
}

/**
 * Builds the full service stack over one temp database: a generate job
 * whose every recipient has a confirmed attachment on disk, so the
 * pre-flight passes. Returns everything a test needs.
 */
async function makeSvc(
  options: { reject?: readonly string[]; failFlaky?: boolean; smtp?: SmtpServiceShape } = {},
): Promise<Svc> {
  const db = openDatabase(join(tempDir(), "send.db"));
  const repo = makeSqliteRepo(db);
  const hub = makeProgressHub();
  const generate = makeGenerateJobService(repo, hub, stubGenerateEnv());
  const realSmtp = makeSmtpService(repo);
  // The retry-schedule probe: every flaky-address send fails INSTANTLY
  // (no network), so the backoff sleeps are the only clock factor and
  // the retry timing measures exactly. The send-call counter probes
  // per-attempt progress without the server.
  let sendCalls = 0;
  const smtp: SmtpServiceShape =
    options.smtp ??
    (options.failFlaky
      ? {
          ...realSmtp,
          send: (credentials, message) => {
            sendCalls += 1;
            if (message.to.includes("flaky")) {
              return Effect.fail(new SmtpSendFailed({ message: "550 mailbox unavailable" }));
            }
            return realSmtp.send(credentials, message);
          },
        }
      : realSmtp);
  const quitLatch = Latch.makeUnsafe(false);
  const service = makeSendJobService(repo, hub, generate, smtp, { quitLatch });
  const events: Array<Record<string, unknown>> = [];
  hub.subscribe((event) => events.push(event as Record<string, unknown>));
  const server = await startCapturingServer(options.reject ?? []);
  const recipientIds = seedRecipients(db);
  const templateId = Effect.runSync(
    repo.insertTemplate({
      name: "LOA",
      filePath: join(tempDir(), "template.docx"),
      type: "docx",
      slots: ["name", "no"],
      outputPattern: "LOA_{no}_{name}.pdf",
    }),
  ).id;
  const generateJobId = Effect.runSync(repo.insertGenerateJob(templateId));
  Effect.runSync(repo.insertGenerateJobRecipients(generateJobId, recipientIds));
  const attachDir = tempDir();
  recipientIds.forEach((id, i) => {
    const outputPath = join(attachDir, `attach-${i}.pdf`);
    writeFileSync(outputPath, "%PDF-1.4 fake");
    Effect.runSync(
      repo.setGenerateRecipientResult(generateJobId, id, {
        status: "generated",
        outputPath,
        errorMessage: null,
      }),
    );
  });
  return {
    db,
    repo,
    service,
    events,
    quitLatch,
    generateJobId,
    recipientIds,
    port: server.port,
    captured: server.captured,
    reject: server.reject,
    attempts: server.attempts,
    sendCalls: () => sendCalls,
  };
}

function startPayload(svc: Svc, overrides: Partial<SendStartPayload> = {}): SendStartPayload {
  return {
    generateJobId: svc.generateJobId,
    recipientIds: [...svc.recipientIds],
    smtpProfileId: null,
    smtpOverride: { host: "127.0.0.1", port: svc.port, username: "me", password: "secret" },
    subject: "LOA for {name}",
    bodyHtml: "<p>Dear {name}, your number is {no}.</p>",
    senderName: "Yayasan X",
    senderAddress: "iym@example.org",
    delayMs: 1000,
    ...overrides,
  };
}

/** Runs an Effect program with a TestClock provided (the clock controls Effect.sleep). */
function withClock<A, E>(program: Effect.Effect<A, E, never>): Promise<A> {
  return Effect.runPromise(program.pipe(Effect.provide(TestClock.layer())));
}

/** A real-time turn so the effect runtime can run the loop's continuations. */
const turn = (): Effect.Effect<void, never, never> => TestClock.withLive(Effect.sleep(10));

/**
 * Advances the test clock in 100ms slices (with a real-time turn after
 * each) until `until()` holds. The run loop schedules each gate sleep
 * from the moment it parks, so a single big adjust can land before the
 * loop reaches the gate; slicing removes that race. `budgetMs` is clock
 * time - it must cover every gate and retry sleep the scenario needs.
 */
function pump(until: () => boolean, budgetMs = 30000): Effect.Effect<void, never, never> {
  return Effect.gen(function* () {
    let advanced = 0;
    while (!until()) {
      if (advanced >= budgetMs) throw new Error("pump: target not reached");
      yield* TestClock.adjust(100);
      advanced += 100;
      yield* turn();
    }
  });
}

/**
 * Advances the clock until the run fiber exits, then returns its
 * outcome. The pump's slices fire the loop's gate sleeps; a slice wins
 * each race while the fiber is still running.
 */
function pumpUntilExit<A, E>(
  fiber: Fiber.Fiber<A, E>,
  budgetMs = 30000,
): Effect.Effect<A, E, never> {
  return Effect.gen(function* () {
    let advanced = 0;
    while (true) {
      // The slice yields void on winning; the fiber's Exit is an object,
      // so the winner is unambiguous.
      const outcome = yield* Fiber.await(fiber).pipe(
        Effect.race(
          Effect.gen(function* () {
            yield* TestClock.adjust(100);
            yield* turn();
          }),
        ),
      );
      if (outcome !== undefined) {
        if (Exit.isSuccess(outcome)) return outcome.value;
        throw new Error(`run fiber ended with: ${JSON.stringify(outcome.cause)}`);
      }
      advanced += 100;
      if (advanced >= budgetMs) throw new Error("pumpUntilExit: budget exceeded");
    }
  });
}

async function jobStatus(svc: Svc, jobId: string): Promise<SendJob> {
  const option = await Effect.runPromise(svc.service.getStatus(jobId));
  if (Option.isNone(option)) throw new Error("job missing");
  return option.value;
}

/** Sends one email through the real stack to prove the server captures it. */
function progressEvents(svc: Svc, status: "sent" | "failed"): number {
  return svc.events.filter((e) => e.kind === "send-progress" && e.status === status).length;
}

describe("SendJobService run (Seam A)", () => {
  it("sends every recipient at the pacing gate with interpolated messages and message ids, then completes", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    expect(job).toMatchObject({ status: "pending", total: 3, cursorIndex: 0 });

    const done = await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 3);
        return yield* pumpUntilExit(fiber);
      }),
    );
    expect(done.status).toBe("completed");

    expect(svc.captured).toHaveLength(3);
    expect(svc.captured[0]).toContain("Subject: LOA for Budi Santoso");
    expect(svc.captured[0]).toContain("Dear Budi Santoso, your number is 001.");
    expect(svc.captured[0]).toContain("name=attach-0.pdf");

    const finished = await jobStatus(svc, job.id);
    expect(finished.status).toBe("completed");
    expect(finished.completedAt).not.toBeNull();
    expect(finished.recipients.map((r) => r.status)).toEqual(["sent", "sent", "sent"]);
    expect(finished.recipients.every((r) => r.messageId !== null)).toBe(true);
    // The cursor persisted in the same transaction as the last outcome.
    expect(finished.cursorIndex).toBe(3);

    // One progress event per recipient, in job order with running counts.
    const progress = svc.events.filter((e) => e.kind === "send-progress");
    expect(progress).toEqual([
      {
        kind: "send-progress",
        jobId: job.id,
        current: 1,
        total: 3,
        status: "sent",
        recipientId: svc.recipientIds[0],
        messageId: expect.any(String),
        error: null,
      },
      {
        kind: "send-progress",
        jobId: job.id,
        current: 2,
        total: 3,
        status: "sent",
        recipientId: svc.recipientIds[1],
        messageId: expect.any(String),
        error: null,
      },
      {
        kind: "send-progress",
        jobId: job.id,
        current: 3,
        total: 3,
        status: "sent",
        recipientId: svc.recipientIds[2],
        messageId: expect.any(String),
        error: null,
      },
    ]);
  });

  it("applies a live pacing-gate interval change without restarting the job", async () => {
    const svc = await makeSvc();
    Effect.runSync(svc.repo.setSetting(SETTING_KEYS.rateLimitDelayMs, "1000"));
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));

    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        // The first gate reads the stored 1000ms.
        yield* pump(() => svc.captured.length === 1);
        // The user changes the rate limit to 500ms while the job runs.
        yield* svc.repo.setSetting(SETTING_KEYS.rateLimitDelayMs, "500");
        // The next two gates fire at 500ms each - the live read took
        // effect without a restart.
        yield* pump(() => svc.captured.length === 3);
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("completed");
      }),
    );
    expect(svc.captured).toHaveLength(3);
  });

  it("clamps the job's pacing snapshot to the slider bounds", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc, { delayMs: 42 })));
    expect(job.delayMs).toBe(500);
    const big = await Effect.runPromise(svc.service.start(startPayload(svc, { delayMs: 99999 })));
    expect(big.delayMs).toBe(5000);
  });

  it("fails a recipient with missing slot data immediately and continues the batch", async () => {
    const svc = await makeSvc();
    const sari = svc.recipientIds[1];
    // Sari has no metadata - the message needs {no} for her. The UPDATE is
    // a plain sync statement run, not an effect.
    svc.db.prepare("UPDATE recipients SET metadata = '{}' WHERE id = ?").run(sari);
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));

    const done = await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length + progressEvents(svc, "failed") >= 3);
        return yield* pumpUntilExit(fiber);
      }),
    );
    expect(done.status).toBe("completed");
    // Only Budi and Andi reached the server; Sari failed without retries.
    expect(svc.captured).toHaveLength(2);
    expect(progressEvents(svc, "failed")).toBe(1);
    const finished = await jobStatus(svc, job.id);
    expect(finished.recipients.map((r) => r.status)).toEqual(["sent", "failed", "sent"]);
    expect(finished.recipients[1].errorMessage).toContain('"{no}"');
  });

  it("fails a recipient with no confirmed attachment and continues the batch", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, { recipientIds: [svc.recipientIds[0], svc.recipientIds[1]] }),
      ),
    );
    // Recipient 2's generate row becomes failed, so only recipient 1 has
    // a confirmed attachment.
    Effect.runSync(
      svc.repo.setGenerateRecipientResult(svc.generateJobId, svc.recipientIds[1], {
        status: "failed",
        outputPath: null,
        errorMessage: "boom",
      }),
    );

    const done = await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1 && progressEvents(svc, "failed") === 1);
        return yield* pumpUntilExit(fiber);
      }),
    );
    expect(done.status).toBe("completed");
    expect(svc.captured).toHaveLength(1);
    const finished = await jobStatus(svc, job.id);
    expect(finished.recipients.map((r) => r.status)).toEqual(["sent", "failed"]);
    expect(finished.recipients[1].errorMessage).toContain("No confirmed generated attachment");
  });

  it("rejects running a finished job as a no-op without sending again", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 3);
        yield* pumpUntilExit(fiber);
      }),
    );
    expect(svc.captured).toHaveLength(3);

    const again = await withClock(
      Effect.gen(function* () {
        return yield* svc.service.run(job.id);
      }),
    );
    expect(again.status).toBe("completed");
    expect(svc.captured).toHaveLength(3);
  });

  it("rejects a second send while any job is sending (one active job)", async () => {
    const svc = await makeSvc();
    const first = await Effect.runPromise(svc.service.start(startPayload(svc)));
    const second = await Effect.runPromise(svc.service.start(startPayload(svc)));
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(first.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        const outcome = yield* svc.service.run(second.id).pipe(Effect.result);
        expect(Result.isFailure(outcome)).toBe(true);
        if (Result.isFailure(outcome)) {
          expect(outcome.failure).toBeInstanceOf(InvalidSendRequest);
          expect(outcome.failure.message).toMatch(/another send/i);
        }
        yield* Fiber.interrupt(fiber);
      }),
    );
  });

  it("rejects a new send while another job is paused but unresumed", async () => {
    const svc = await makeSvc();
    const first = await Effect.runPromise(svc.service.start(startPayload(svc)));
    const second = await Effect.runPromise(svc.service.start(startPayload(svc)));
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(first.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        yield* svc.service.pause(first.id);
        yield* pumpUntilExit(fiber);
        const outcome = yield* svc.service.run(second.id).pipe(Effect.result);
        expect(Result.isFailure(outcome)).toBe(true);
        if (Result.isFailure(outcome)) {
          expect(outcome.failure).toBeInstanceOf(InvalidSendRequest);
          expect(outcome.failure.message).toMatch(/paused/i);
        }
      }),
    );
  });

  it("rejects a run while the same job is still winding down from a pause", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        yield* svc.service.pause(job.id);
        // The pause handler returned but the old loop is still stopping:
        // a run right now must be rejected, never double-delivering.
        const outcome = yield* svc.service.run(job.id).pipe(Effect.result);
        expect(Result.isFailure(outcome)).toBe(true);
        if (Result.isFailure(outcome)) {
          expect(outcome.failure).toBeInstanceOf(InvalidSendRequest);
          expect(outcome.failure.message).toMatch(/still pausing/i);
        }
        yield* pumpUntilExit(fiber);
      }),
    );
  });

  it("fails fast on the SMTP pre-flight and leaves the job pending", async () => {
    const svc = await makeSvc();
    const port = await closedPort();
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, {
          smtpOverride: { host: "127.0.0.1", port, username: "me", password: "secret" },
        }),
      ),
    );
    const outcome = await Effect.runPromise(svc.service.run(job.id).pipe(Effect.result));
    expect(Result.isFailure(outcome)).toBe(true);
    if (Result.isFailure(outcome)) {
      expect(outcome.failure).toBeInstanceOf(SmtpConnectFailed);
    }
    expect(svc.captured).toHaveLength(0);
    expect((await jobStatus(svc, job.id)).status).toBe("pending");
  });

  it("fails fast when no recipient has a confirmed generated attachment", async () => {
    const svc = await makeSvc();
    // A second generate job with no confirmed output; the send job
    // references it, so the pre-flight fails fast.
    const emptyGenJobId = Effect.runSync(svc.repo.insertGenerateJob("some-template"));
    const job = await Effect.runPromise(
      svc.service.start(startPayload(svc, { generateJobId: emptyGenJobId })),
    );
    const outcome = await Effect.runPromise(svc.service.run(job.id).pipe(Effect.result));
    expect(Result.isFailure(outcome)).toBe(true);
    if (Result.isFailure(outcome)) {
      expect(outcome.failure).toBeInstanceOf(InvalidSendRequest);
      expect(outcome.failure.message).toMatch(/generated attachment/i);
    }
    expect(svc.captured).toHaveLength(0);
    expect((await jobStatus(svc, job.id)).status).toBe("pending");
  });
});

describe("SendJobService retry schedule (Seam A)", () => {
  it("retries 3 times at 1s/2s/4s, then pauses the job with a job-paused event", async () => {
    // Flaky sends fail instantly through the stub seam, so the retry
    // backoffs are the only clock factor and their timing measures
    // exactly: flaky attempt 1 at t0, then t0+1s, t0+3s, t0+7s.
    const svc = await makeSvc({ failFlaky: true });
    const sari = svc.recipientIds[1];
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, { subject: "Hi {name}", bodyHtml: "<p>Dear {name}</p>" }),
      ),
    );
    svc.db.prepare("UPDATE recipients SET email = 'flaky@example.com' WHERE id = ?").run(sari);

    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        // Recipient 1 sends after the first gate.
        yield* pump(() => svc.sendCalls() === 1);
        // Recipient 2: flaky attempt 1 fails, then the backoff sleeps.
        yield* pump(() => svc.sendCalls() === 2);
        const a1 = yield* Clock.currentTimeMillis;
        yield* pump(() => svc.sendCalls() === 3);
        const a2 = yield* Clock.currentTimeMillis;
        yield* pump(() => svc.sendCalls() === 4);
        const a3 = yield* Clock.currentTimeMillis;
        yield* pump(() => svc.sendCalls() === 5);
        const a4 = yield* Clock.currentTimeMillis;
        // The schedule: 1s, 2s, 4s backoff, cumulative 1s/3s/7s.
        expect(a2 - a1).toBeGreaterThanOrEqual(1000);
        expect(a2 - a1).toBeLessThan(1200);
        expect(a3 - a1).toBeGreaterThanOrEqual(3000);
        expect(a3 - a1).toBeLessThan(3200);
        expect(a4 - a1).toBeGreaterThanOrEqual(7000);
        expect(a4 - a1).toBeLessThan(7200);
        // Exhausted: the job auto-pauses (persisted + event).
        const result = yield* pumpUntilExit(fiber);
        expect(result.status).toBe("paused");
        expect(result.recipients.map((r) => r.status)).toEqual(["sent", "failed", "pending"]);
        expect(result.recipients[1].errorMessage).toMatch(/Retries exhausted/);
        expect(result.cursorIndex).toBe(2);
        const pausedEvent = svc.events.find((e) => e.kind === "job-paused");
        expect(pausedEvent).toEqual({
          kind: "job-paused",
          jobId: job.id,
          reason: "retry-exhausted",
          lastIndex: 2,
        });
      }),
    );
    // The stub never touches the server for flaky; only recipient 1 lands.
    expect(svc.captured).toHaveLength(1);
  });

  it("resumes after auto-pause from the cursor without double-sending", async () => {
    const svc = await makeSvc({ reject: ["flaky@example.com"] });
    const sari = svc.recipientIds[1];
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, { subject: "Hi {name}", bodyHtml: "<p>Dear {name}</p>" }),
      ),
    );
    svc.db.prepare("UPDATE recipients SET email = 'flaky@example.com' WHERE id = ?").run(sari);

    // First run: recipient 2 exhausts retries, job pauses.
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.events.some((e) => e.kind === "job-paused"));
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("paused");
      }),
    );

    // Resume and run again: recipient 3 sends; recipient 1 is NOT
    // re-sent; recipient 2 stays failed.
    const resumed = await Effect.runPromise(svc.service.resume(job.id));
    expect(resumed.status).toBe("pending");
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 2);
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("completed");
      }),
    );
    expect(svc.captured).toHaveLength(2);
    const finished = await jobStatus(svc, job.id);
    expect(finished.recipients.map((r) => r.status)).toEqual(["sent", "failed", "sent"]);
  });
});

describe("SendJobService pause, resume, cancel (Seam A)", () => {
  it("pauses at the next checkpoint and resumes from the cursor without double-sending", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));

    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        // Pause while the loop sleeps at gate 2 - the wake latch
        // interrupts the delay.
        const paused = yield* svc.service.pause(job.id);
        expect(paused.status).toBe("paused");
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("paused");
        expect(done.recipients.map((r) => r.status)).toEqual(["sent", "pending", "pending"]);
        expect(done.cursorIndex).toBe(1);
        const pausedEvent = svc.events.find((e) => e.kind === "job-paused");
        expect(pausedEvent).toEqual({
          kind: "job-paused",
          jobId: job.id,
          reason: "user",
          lastIndex: 1,
        });
      }),
    );

    // Resume: gates 2 and 3 fire; recipient 1 is not re-sent.
    await withClock(
      Effect.gen(function* () {
        const resumed = yield* svc.service.resume(job.id);
        expect(resumed.status).toBe("pending");
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 3);
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("completed");
      }),
    );
    expect(svc.captured).toHaveLength(3);
    expect((await jobStatus(svc, job.id)).recipients.every((r) => r.status === "sent")).toBe(true);
  });

  it("supports unlimited pause/resume cycles", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    const cycle = async (sentTarget: number, last: boolean): Promise<void> => {
      await withClock(
        Effect.gen(function* () {
          const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
          yield* pump(() => svc.captured.length >= sentTarget);
          if (!last) {
            yield* svc.service.pause(job.id);
            yield* pumpUntilExit(fiber);
            yield* svc.service.resume(job.id);
          } else {
            const done = yield* pumpUntilExit(fiber);
            expect(done.status).toBe("completed");
          }
        }),
      );
    };
    await cycle(1, false);
    await cycle(2, false);
    await cycle(3, true);
    expect(svc.captured).toHaveLength(3);
    expect((await jobStatus(svc, job.id)).status).toBe("completed");
  });

  it("cancel marks the remainder skipped in one transaction and the job cancelled", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        const cancelled = yield* svc.service.cancel(job.id);
        expect(cancelled.status).toBe("cancelled");
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("cancelled");
      }),
    );
    const finished = await jobStatus(svc, job.id);
    expect(finished.status).toBe("cancelled");
    expect(finished.completedAt).not.toBeNull();
    expect(finished.recipients.map((r) => r.status)).toEqual(["sent", "skipped", "skipped"]);
    expect(svc.captured).toHaveLength(1);
  });

  it("rejects pause and resume in the wrong phases", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    const pauseOutcome = await Effect.runPromise(svc.service.pause(job.id).pipe(Effect.result));
    expect(Result.isFailure(pauseOutcome)).toBe(true);
    if (Result.isFailure(pauseOutcome)) {
      expect(pauseOutcome.failure).toBeInstanceOf(InvalidSendRequest);
    }
    const resumeOutcome = await Effect.runPromise(svc.service.resume(job.id).pipe(Effect.result));
    expect(Result.isFailure(resumeOutcome)).toBe(true);
    if (Result.isFailure(resumeOutcome)) {
      expect(resumeOutcome.failure).toBeInstanceOf(InvalidSendRequest);
    }
  });

  it("rejects cancel after completion", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 3);
        yield* pumpUntilExit(fiber);
      }),
    );
    const outcome = await Effect.runPromise(svc.service.cancel(job.id).pipe(Effect.result));
    expect(Result.isFailure(outcome)).toBe(true);
    if (Result.isFailure(outcome)) {
      expect(outcome.failure).toBeInstanceOf(InvalidSendRequest);
    }
  });
});

describe("SendJobService cursor persistence and restart-resume (Seam A)", () => {
  it("persists the cursor with each outcome and resumes on a fresh service over the same database", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));

    // Run 1: one send, then pause. The cursor is in the DB.
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        yield* svc.service.pause(job.id);
        yield* pumpUntilExit(fiber);
      }),
    );
    const paused = await jobStatus(svc, job.id);
    expect(paused.cursorIndex).toBe(1);
    expect(paused.recipients[0].status).toBe("sent");

    // "Restart": a brand-new service instance over the same database,
    // with a fresh hub - exactly what a relaunch does. The cursor is
    // authoritative: recipient 1 is not re-sent.
    const hub2 = makeProgressHub();
    const events2: Array<Record<string, unknown>> = [];
    hub2.subscribe((event) => events2.push(event as Record<string, unknown>));
    const generate2 = makeGenerateJobService(svc.repo, hub2, stubGenerateEnv());
    const smtp2 = makeSmtpService(svc.repo);
    const service2 = makeSendJobService(svc.repo, hub2, generate2, smtp2, {
      quitLatch: Latch.makeUnsafe(false),
    });

    await withClock(
      Effect.gen(function* () {
        const resumed = yield* service2.resume(job.id);
        expect(resumed.status).toBe("pending");
        const fiber = yield* service2.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 3);
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("completed");
      }),
    );
    // Each recipient was sent exactly once across both runs.
    expect(svc.captured).toHaveLength(3);
    expect((await jobStatus(svc, job.id)).recipients.every((r) => r.status === "sent")).toBe(true);
  });

  it("the quit Latch stops the loop between recipients, losing at most the in-flight one", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    const done = await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        // The app starts quitting while the loop sleeps at gate 2.
        svc.quitLatch.openUnsafe();
        // The gate fires; the checkpoint sees the open latch and the run
        // exits between recipients.
        return yield* pumpUntilExit(fiber);
      }),
    );
    // The job stays `sending` - ticket 17's boot treats it as paused and
    // resumes from the persisted cursor.
    expect(done.status).toBe("sending");
    expect(done.recipients.map((r) => r.status)).toEqual(["sent", "pending", "pending"]);
    expect(done.cursorIndex).toBe(1);
    expect(svc.captured).toHaveLength(1);
  });
});

describe("SendJobService cancel vs retry exhaustion (Seam A)", () => {
  it("cancel during the retry backoff stands - exhaustion never overwrites it", async () => {
    // Flaky sends fail instantly through the stub, so the cancel can land
    // while the retry sleeps are still pending.
    const svc = await makeSvc({ failFlaky: true });
    const sari = svc.recipientIds[1];
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, { subject: "Hi {name}", bodyHtml: "<p>Dear {name}</p>" }),
      ),
    );
    svc.db.prepare("UPDATE recipients SET email = 'flaky@example.com' WHERE id = ?").run(sari);

    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.sendCalls() === 1);
        // Recipient 2's first attempt fails; cancel while the 1s retry
        // sleep is pending.
        yield* pump(() => svc.sendCalls() === 2);
        const cancelled = yield* svc.service.cancel(job.id);
        expect(cancelled.status).toBe("cancelled");
        // The retries still run to exhaustion (the backoff is not
        // interruptible), but the exhaust branch must not pause the job.
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("cancelled");
        expect(svc.events.some((e) => e.kind === "job-paused")).toBe(false);
        expect(done.recipients.map((r) => r.status)).toEqual(["sent", "failed", "skipped"]);
      }),
    );
  });

  it("cancel during the last recipient's delivery is never overwritten by completed", async () => {
    const svc = await makeSvc({ failFlaky: true });
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, { subject: "Hi {name}", bodyHtml: "<p>Dear {name}</p>" }),
      ),
    );
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        // Send recipients 1 and 2, then cancel while the last gate is
        // pending - the loop's terminal stamp must not override it.
        yield* pump(() => svc.sendCalls() === 2);
        const cancelled = yield* svc.service.cancel(job.id);
        expect(cancelled.status).toBe("cancelled");
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("cancelled");
        expect(done.recipients.map((r) => r.status)).toEqual(["sent", "sent", "skipped"]);
      }),
    );
  });
});

describe("SendJobService retry failures (Seam A)", () => {
  it("retries exactly the failed recipients of a finished job and completes", async () => {
    const svc = await makeSvc({ reject: ["flaky@example.com"] });
    const sari = svc.recipientIds[1];
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, { subject: "Hi {name}", bodyHtml: "<p>Dear {name}</p>" }),
      ),
    );
    svc.db.prepare("UPDATE recipients SET email = 'flaky@example.com' WHERE id = ?").run(sari);

    // Run 1: recipient 2 exhausts retries -> pause; run 2 (resume):
    // recipient 3 sends -> completed with 1 failed.
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.events.some((e) => e.kind === "job-paused"));
        yield* pumpUntilExit(fiber);
      }),
    );
    await withClock(
      Effect.gen(function* () {
        yield* svc.service.resume(job.id);
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 2);
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("completed");
        expect(done.recipients.map((r) => r.status)).toEqual(["sent", "failed", "sent"]);
      }),
    );

    // The server accepts flaky@example.com now - retry exactly the
    // failed recipient.
    svc.reject.delete("flaky@example.com");
    const retried = await Effect.runPromise(svc.service.retryFailed(job.id));
    expect(retried.status).toBe("pending");
    expect(retried.recipients.map((r) => r.status)).toEqual(["sent", "pending", "sent"]);
    expect(retried.cursorIndex).toBe(1);

    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 3);
        const done = yield* pumpUntilExit(fiber);
        expect(done.status).toBe("completed");
        expect(done.recipients.map((r) => r.status)).toEqual(["sent", "sent", "sent"]);
      }),
    );
    expect(svc.captured).toHaveLength(3);
  });

  it("fails a recipient immediately on a deterministic send error without retries", async () => {
    let sendCalls = 0;
    const realSmtp = makeSmtpService(makeSqliteRepo(openDatabase(join(tempDir(), "stub.db"))));
    const stubSmtp: SmtpServiceShape = {
      ...realSmtp,
      send: (credentials, message) => {
        sendCalls += 1;
        if (message.to === "sari@example.com") {
          // The file vanished between the pre-flight and the send: the
          // deterministic AttachmentNotFound must fail the recipient on
          // the FIRST attempt, never stalling through the backoff.
          return Effect.fail(new AttachmentNotFound({ message: "ENOENT: no such file" }));
        }
        return realSmtp.send(credentials, message);
      },
    };
    const svc = await makeSvc({ smtp: stubSmtp });
    const job = await Effect.runPromise(
      svc.service.start(
        startPayload(svc, { subject: "Hi {name}", bodyHtml: "<p>Dear {name}</p>" }),
      ),
    );

    const done = await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length + progressEvents(svc, "failed") >= 2);
        return yield* pumpUntilExit(fiber);
      }),
    );
    expect(done.status).toBe("completed");
    expect(done.recipients.map((r) => r.status)).toEqual(["sent", "failed", "sent"]);
    expect(done.recipients[1].errorMessage).toMatch(/ENOENT/);
    // Exactly one attempt for Sari - no retries for a deterministic error.
    expect(sendCalls).toBe(3);
  });

  it("rejects retryFailed for a non-finished job and when nothing failed", async () => {
    const svc = await makeSvc();
    const job = await Effect.runPromise(svc.service.start(startPayload(svc)));
    const early = await Effect.runPromise(svc.service.retryFailed(job.id).pipe(Effect.result));
    expect(Result.isFailure(early)).toBe(true);
    if (Result.isFailure(early)) {
      expect(early.failure).toBeInstanceOf(InvalidSendRequest);
    }

    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 3);
        yield* pumpUntilExit(fiber);
      }),
    );
    const none = await Effect.runPromise(svc.service.retryFailed(job.id).pipe(Effect.result));
    expect(Result.isFailure(none)).toBe(true);
    if (Result.isFailure(none)) {
      expect(none.failure).toBeInstanceOf(InvalidSendRequest);
      expect(none.failure.message).toMatch(/no failed recipients/i);
    }
  });
});

describe("SendJobService start validation (Seam A)", () => {
  it("rejects an empty message, missing SMTP identity, and unknown profiles", async () => {
    const svc = await makeSvc();
    const cases: { payload: SendStartPayload; message: RegExp }[] = [
      { payload: startPayload(svc, { subject: "  " }), message: /subject/i },
      { payload: startPayload(svc, { bodyHtml: "" }), message: /body/i },
      { payload: startPayload(svc, { senderName: "", senderAddress: "" }), message: /sender/i },
      {
        payload: startPayload(svc, { smtpProfileId: null, smtpOverride: null }),
        message: /smtp|profile|connection/i,
      },
      {
        payload: startPayload(svc, {
          smtpProfileId: "ghost-profile",
          smtpOverride: { host: "x", port: 1, username: "u", password: "p" },
        }),
        message: /not both/i,
      },
      { payload: startPayload(svc, { recipientIds: [] }), message: /recipient/i },
    ];
    const caseOutcomes = await Promise.all(
      cases.map(({ payload }) => Effect.runPromise(svc.service.start(payload).pipe(Effect.result))),
    );
    for (const [i, outcome] of caseOutcomes.entries()) {
      expect(Result.isFailure(outcome)).toBe(true);
      if (Result.isFailure(outcome)) {
        expect(outcome.failure).toBeInstanceOf(InvalidSendRequest);
        expect(outcome.failure.message).toMatch(cases[i].message);
      }
    }
    const ghost = await Effect.runPromise(
      svc.service
        .start(startPayload(svc, { smtpProfileId: "ghost-profile", smtpOverride: null }))
        .pipe(Effect.result),
    );
    expect(Result.isFailure(ghost)).toBe(true);
    if (Result.isFailure(ghost)) {
      expect(ghost.failure).toBeInstanceOf(SmtpProfileNotFound);
    }
  });

  it("round-trips the stored profile identity and the deleted profile name", async () => {
    const svc = await makeSvc();
    const profile = Effect.runSync(
      svc.repo.insertSmtpProfile({
        name: "Gmail",
        host: "127.0.0.1",
        port: svc.port,
        username: "me",
        password: "secret",
      }),
    );
    const job = await Effect.runPromise(
      svc.service.start(startPayload(svc, { smtpProfileId: profile.id, smtpOverride: null })),
    );
    expect(job.smtpProfileId).toBe(profile.id);
    expect(job.smtpProfileName).toBe("Gmail");
    expect(job.smtpOverride).toBeNull();

    // The job runs through the profile's stored credentials.
    await withClock(
      Effect.gen(function* () {
        const fiber = yield* svc.service.run(job.id).pipe(Effect.forkChild);
        yield* pump(() => svc.captured.length === 1);
        yield* Fiber.interrupt(fiber);
      }),
    );
    expect(svc.captured).toHaveLength(1);

    // Deleting the profile surfaces "(deleted profile)" in the snapshot.
    Effect.runSync(svc.repo.deleteSmtpProfile(profile.id));
    const after = await jobStatus(svc, job.id);
    expect(after.smtpProfileName).toBe("(deleted profile)");
  });

  it("reports an unknown job across every lifecycle call", async () => {
    const svc = await makeSvc();
    const outcomes = await Promise.all(
      [
        svc.service.run("nope"),
        svc.service.pause("nope"),
        svc.service.resume("nope"),
        svc.service.cancel("nope"),
        svc.service.retryFailed("nope"),
      ].map((call) => Effect.runPromise(call.pipe(Effect.result))),
    );
    for (const outcome of outcomes) {
      expect(Result.isFailure(outcome)).toBe(true);
      if (Result.isFailure(outcome)) {
        expect(outcome.failure).toBeInstanceOf(SendJobNotFound);
      }
    }
    const missing = await Effect.runPromise(svc.service.getStatus("nope"));
    expect(Option.isNone(missing)).toBe(true);
  });
});
