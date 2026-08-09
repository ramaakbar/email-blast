import { afterEach, describe, expect, it } from "vitest";
import { Effect, Layer, Option } from "effect";
import { createServer } from "net";
import { join } from "path";
import { writeFileSync } from "fs";
import { SMTPServer } from "smtp-server";
import { openDatabase, SqliteRepo } from "../db/repository";
import { SmtpService, type SmtpServiceShape } from "./smtp";
import { tempDir } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): the SMTP domain against a real Effect
 * Layer on a temp database, and the connection test against a real local
 * SMTP server (smtp-server) - a bad host must fail with a typed SendError.
 */

/** Runs an Effect program that borrows the SmtpService from its layer. */
function use<A, E>(
  layer: Layer.Layer<SmtpService | SqliteRepo>,
  f: (service: SmtpServiceShape) => Effect.Effect<A, E, never>,
): Promise<A> {
  return Effect.runPromise(
    Effect.gen(function* () {
      return yield* f(yield* SmtpService);
    }).pipe(Effect.provide(layer)),
  );
}

function smtpLayer(): Layer.Layer<SmtpService | SqliteRepo> {
  return SmtpService.Live(openDatabase(join(tempDir(), "smtp.db")));
}

const servers: SMTPServer[] = [];

afterEach(async () => {
  // smtp-server's close() returns nothing without a callback - the
  // callback form is the only way to wait for the shutdown.
  await Promise.all(
    servers
      .splice(0)
      .map((server) => new Promise<void>((resolve) => server.close(() => resolve()))),
  );
});

/**
 * Starts a real SMTP server on an ephemeral port. When `user`/`pass` are
 * given, AUTH succeeds only with those credentials; otherwise every
 * credential is accepted.
 *
 * STARTTLS is hidden and plaintext auth allowed: smtp-server bundles an
 * expired self-signed certificate (2015-2025) for its default STARTTLS,
 * which modern Node rejects before auth is ever reached. The tests are
 * about connect + auth semantics, so the plaintext path keeps them real
 * without the expired-cert noise.
 */
async function startServer(credentials?: {
  user: string;
  pass: string;
}): Promise<{ port: number }> {
  const server = new SMTPServer({
    hideSTARTTLS: true,
    allowInsecureAuth: true,
    onAuth(auth, _session, callback) {
      if (credentials === undefined) {
        callback(null, { user: auth.username });
      } else if (auth.username === credentials.user && auth.password === credentials.pass) {
        callback(null, { user: auth.username });
      } else {
        callback(new Error("Invalid credentials"));
      }
    },
  });
  servers.push(server);
  await new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.server.address();
  if (address === null || typeof address === "string") throw new Error("No ephemeral port");
  return { port: address.port };
}

/** One delivered message, captured from the wire: envelope plus raw MIME. */
interface CapturedMail {
  readonly from: string;
  readonly to: string;
  readonly raw: string;
}

/**
 * Starts a server that captures every accepted message (the send
 * pipeline's seam: the tests assert against what actually went out).
 * Recipients whose address contains "fail" are rejected at RCPT so a
 * send can fail deterministically.
 */
async function startCapturingServer(): Promise<{ port: number; captured: CapturedMail[] }> {
  const captured: CapturedMail[] = [];
  const server = new SMTPServer({
    hideSTARTTLS: true,
    allowInsecureAuth: true,
    onAuth(auth, _session, callback) {
      callback(null, { user: auth.username });
    },
    onRcptTo(rcpt, _session, callback) {
      if (rcpt.address.includes("fail")) {
        callback(new Error("mailbox unavailable"));
        return;
      }
      callback(null);
    },
    onData(stream, session, callback) {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("end", () => {
        captured.push({
          from:
            session.envelope.mailFrom === false ? "" : (session.envelope.mailFrom?.address ?? ""),
          to: session.envelope.rcptTo[0]?.address ?? "",
          raw: Buffer.concat(chunks).toString("utf8"),
        });
        callback(null);
      });
    },
  });
  servers.push(server);
  await new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.server.address();
  if (address === null || typeof address === "string") throw new Error("No ephemeral port");
  return { port: address.port, captured };
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

const GMAIL = {
  name: "Gmail utama",
  host: "smtp.gmail.com",
  port: 587,
  username: "akbar@example.com",
  password: "abcd efgh ijkl mnop",
  senderName: "Yayasan X",
  senderAddress: "iym@example.org",
  replyTo: "reply@example.org",
};

describe("SmtpService create (Seam A)", () => {
  it("round-trips a profile through create, list, and get, with the password masked", async () => {
    const layer = smtpLayer();
    const created = await use(layer, (s) => s.create(GMAIL));
    expect(created).toMatchObject({
      id: expect.stringMatching(/^[0-9a-f-]{36}$/),
      name: GMAIL.name,
      host: GMAIL.host,
      port: GMAIL.port,
      username: GMAIL.username,
      hasPassword: true,
      createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    });
    // The public shape never carries the password itself.
    expect("password" in created).toBe(false);

    const listed = await use(layer, (s) => s.list());
    expect(listed).toEqual([created]);

    const fetched = await use(layer, (s) => s.get(created.id));
    expect(fetched).toEqual(Option.some(created));
    await expect(use(layer, (s) => s.get("no-such-id"))).resolves.toEqual(Option.none());
  });

  it("trims the name, host, and username", async () => {
    const layer = smtpLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "  Gmail utama  ",
        host: "  smtp.gmail.com  ",
        port: 587,
        username: "  akbar@example.com  ",
        password: "abcd efgh ijkl mnop",
        senderName: null,
        senderAddress: null,
        replyTo: null,
      }),
    );
    expect(created.name).toBe("Gmail utama");
    expect(created.host).toBe("smtp.gmail.com");
    expect(created.username).toBe("akbar@example.com");
  });

  it("rejects empty fields and invalid ports", async () => {
    const layer = smtpLayer();
    await expect(use(layer, (s) => s.create({ ...GMAIL, name: "  " }))).rejects.toMatchObject({
      _tag: "InvalidSmtpProfile",
      message: expect.stringMatching(/name/),
    });
    await expect(use(layer, (s) => s.create({ ...GMAIL, host: "" }))).rejects.toMatchObject({
      _tag: "InvalidSmtpProfile",
      message: expect.stringMatching(/host/i),
    });
    await expect(use(layer, (s) => s.create({ ...GMAIL, port: 0 }))).rejects.toMatchObject({
      _tag: "InvalidSmtpProfile",
      message: expect.stringMatching(/port/i),
    });
    await expect(use(layer, (s) => s.create({ ...GMAIL, port: 70_000 }))).rejects.toMatchObject({
      _tag: "InvalidSmtpProfile",
      message: expect.stringMatching(/port/i),
    });
    await expect(use(layer, (s) => s.create({ ...GMAIL, username: " " }))).rejects.toMatchObject({
      _tag: "InvalidSmtpProfile",
      message: expect.stringMatching(/username/i),
    });
    await expect(use(layer, (s) => s.create({ ...GMAIL, password: "" }))).rejects.toMatchObject({
      _tag: "InvalidSmtpProfile",
      message: expect.stringMatching(/password/i),
    });
  });
});

describe("SmtpService update (Seam A)", () => {
  it("updates the fields and persists them, password kept when null", async () => {
    const layer = smtpLayer();
    const created = await use(layer, (s) => s.create(GMAIL));

    const updated = await use(layer, (s) =>
      s.update(created.id, {
        name: "Gmail kantor",
        host: "smtp.gmail.com",
        port: 465,
        username: "kantor@example.com",
        password: null, // keep the stored credential
        senderName: null,
        senderAddress: null,
        replyTo: null,
      }),
    );
    expect(updated).toMatchObject({
      id: created.id,
      name: "Gmail kantor",
      host: "smtp.gmail.com",
      port: 465,
      username: "kantor@example.com",
      hasPassword: true,
    });

    const fetched = await use(layer, (s) => s.get(created.id));
    expect(fetched).toEqual(Option.some(updated));
  });

  it("replaces the password when given", async () => {
    const layer = smtpLayer();
    // The profile points at the local server so testProfile reaches it:
    // the stored credential is the one the updated profile tests with.
    const { port } = await startServer({ user: GMAIL.username, pass: "wxyz 1234 abcd efgh" });
    const created = await use(layer, (s) => s.create({ ...GMAIL, host: "127.0.0.1", port }));
    const updated = await use(layer, (s) =>
      s.update(created.id, { ...GMAIL, host: "127.0.0.1", port, password: "wxyz 1234 abcd efgh" }),
    );
    expect(updated.hasPassword).toBe(true);

    await expect(use(layer, (s) => s.testProfile(created.id))).resolves.toBeUndefined();
  });

  it("fails with SmtpProfileNotFound for an unknown id", async () => {
    const layer = smtpLayer();
    await expect(
      use(layer, (s) =>
        s.update("no-such-id", {
          name: "Ghost",
          host: "smtp.gmail.com",
          port: 587,
          username: "ghost@example.com",
          password: null,
          senderName: null,
          senderAddress: null,
          replyTo: null,
        }),
      ),
    ).rejects.toMatchObject({ _tag: "SmtpProfileNotFound" });
  });

  it("still validates on update", async () => {
    const layer = smtpLayer();
    const created = await use(layer, (s) => s.create(GMAIL));
    await expect(
      use(layer, (s) => s.update(created.id, { ...GMAIL, port: 0 })),
    ).rejects.toMatchObject({ _tag: "InvalidSmtpProfile" });
  });
});

describe("SmtpService delete (Seam A)", () => {
  it("deletes a profile and reports the count", async () => {
    const layer = smtpLayer();
    const created = await use(layer, (s) => s.create(GMAIL));

    await expect(use(layer, (s) => s.delete(created.id))).resolves.toBe(1);
    await expect(use(layer, (s) => s.get(created.id))).resolves.toEqual(Option.none());
    await expect(use(layer, (s) => s.delete(created.id))).resolves.toBe(0);
  });

  it("lists newest first", async () => {
    const layer = smtpLayer();
    await use(layer, (s) => s.create({ ...GMAIL, name: "First" }));
    await use(layer, (s) => s.create({ ...GMAIL, name: "Second" }));
    const listed = await use(layer, (s) => s.list());
    expect(listed.map((p) => p.name)).toEqual(["Second", "First"]);
  });
});

describe("SmtpService test (Seam A)", () => {
  it("succeeds against a local SMTP server that accepts the credentials", async () => {
    const layer = smtpLayer();
    const { port } = await startServer();
    await expect(
      use(layer, (s) => s.test({ host: "127.0.0.1", port, username: "me", password: "secret" })),
    ).resolves.toBeUndefined();
  });

  it("fails with SmtpConnectFailed against a bad host", async () => {
    const layer = smtpLayer();
    const port = await closedPort();
    await expect(
      use(layer, (s) => s.test({ host: "127.0.0.1", port, username: "me", password: "secret" })),
    ).rejects.toMatchObject({ _tag: "SmtpConnectFailed" });
  });

  it("fails with SmtpAuthFailed when the server rejects the credentials", async () => {
    const layer = smtpLayer();
    const { port } = await startServer({ user: "me", pass: "right" });
    await expect(
      use(layer, (s) => s.test({ host: "127.0.0.1", port, username: "me", password: "wrong" })),
    ).rejects.toMatchObject({ _tag: "SmtpAuthFailed" });
  });

  it("testProfile uses the stored credentials", async () => {
    const layer = smtpLayer();
    const { port } = await startServer({ user: GMAIL.username, pass: GMAIL.password });
    const created = await use(layer, (s) => s.create({ ...GMAIL, host: "127.0.0.1", port }));
    await expect(use(layer, (s) => s.testProfile(created.id))).resolves.toBeUndefined();
  });

  it("testProfile fails with SmtpProfileNotFound for an unknown id", async () => {
    const layer = smtpLayer();
    await expect(use(layer, (s) => s.testProfile("no-such-id"))).rejects.toMatchObject({
      _tag: "SmtpProfileNotFound",
    });
  });
});

describe("SmtpService send (Seam A)", () => {
  const MAIL = {
    to: "budi@example.com",
    subject: "Surat LOA untuk Budi",
    html: "<p>Dear Budi</p>",
    fromName: "Yayasan X",
    fromAddress: "iym@example.org",
    replyTo: null,
    attachments: [] as readonly { filename: string; path: string }[],
  };

  it("delivers the message and returns the server message id", async () => {
    const layer = smtpLayer();
    const { port, captured } = await startCapturingServer();
    const messageId = await use(layer, (s) =>
      s.send({ host: "127.0.0.1", port, username: "me", password: "secret" }, MAIL),
    );
    expect(messageId).toMatch(/@/);
    expect(captured).toHaveLength(1);
    expect(captured[0]).toMatchObject({
      from: "iym@example.org",
      to: "budi@example.com",
    });
    // The MIME payload carries the display name, subject, and html body.
    expect(captured[0].raw).toContain("Yayasan X");
    expect(captured[0].raw).toContain("Subject: Surat LOA untuk Budi");
    expect(captured[0].raw).toContain("Dear Budi");
  });

  it("attaches the given files by path", async () => {
    const layer = smtpLayer();
    const { port, captured } = await startCapturingServer();
    const attachmentPath = join(tempDir(), "LOA_budi.pdf");
    writeFileSync(attachmentPath, "%PDF-1.4 fake");
    await use(layer, (s) =>
      s.send(
        { host: "127.0.0.1", port, username: "me", password: "secret" },
        { ...MAIL, attachments: [{ filename: "LOA_budi.pdf", path: attachmentPath }] },
      ),
    );
    expect(captured[0].raw).toContain("name=LOA_budi.pdf");
    // The attachment travels base64-encoded in the MIME body.
    expect(captured[0].raw).toContain(Buffer.from("%PDF-1.4 fake").toString("base64"));
  });

  it("fails with SmtpAuthFailed when the server rejects the credentials", async () => {
    const layer = smtpLayer();
    const { port } = await startServer({ user: "me", pass: "right" });
    await expect(
      use(layer, (s) =>
        s.send({ host: "127.0.0.1", port, username: "me", password: "wrong" }, MAIL),
      ),
    ).rejects.toMatchObject({ _tag: "SmtpAuthFailed" });
  });

  it("fails with SmtpConnectFailed against a bad host", async () => {
    const layer = smtpLayer();
    const port = await closedPort();
    await expect(
      use(layer, (s) =>
        s.send({ host: "127.0.0.1", port, username: "me", password: "secret" }, MAIL),
      ),
    ).rejects.toMatchObject({ _tag: "SmtpConnectFailed" });
  });

  it("fails with AttachmentNotFound when an attachment file is missing", async () => {
    const layer = smtpLayer();
    const { port } = await startCapturingServer();
    await expect(
      use(layer, (s) =>
        s.send(
          { host: "127.0.0.1", port, username: "me", password: "secret" },
          {
            ...MAIL,
            attachments: [{ filename: "ghost.pdf", path: join(tempDir(), "ghost.pdf") }],
          },
        ),
      ),
    ).rejects.toMatchObject({ _tag: "AttachmentNotFound" });
  });
});

describe("SmtpService getCredentials (Seam A)", () => {
  it("resolves the stored credential of a saved profile", async () => {
    const layer = smtpLayer();
    const created = await use(layer, (s) => s.create(GMAIL));
    const credentials = await use(layer, (s) => s.getCredentials(created.id));
    expect(credentials).toEqual({
      host: GMAIL.host,
      port: GMAIL.port,
      username: GMAIL.username,
      password: GMAIL.password,
    });
  });

  it("fails with SmtpProfileNotFound for an unknown id", async () => {
    const layer = smtpLayer();
    await expect(use(layer, (s) => s.getCredentials("no-such-id"))).rejects.toMatchObject({
      _tag: "SmtpProfileNotFound",
    });
  });
});
