import { describe, expect, it } from "vitest";
import { Context, Effect } from "effect";
import { join } from "path";
import { m } from "@paraglide/messages";
import type Database from "better-sqlite3";
import type { UpdateState } from "../../shared/ipc";
import { makeHandler } from "../ipc-core";
import { makeSqliteRepo, openDatabase } from "../db/repository";
import { makeCredentialCrypto } from "./credential-crypto";
import { tempDir } from "./test-helpers";
import {
  makeUpdateService,
  updateOperations,
  UpdateService,
  UPDATE_REPO,
  type UpdateEnv,
  type UpdateServiceShape,
  type UpdaterAdapter,
} from "./update";

/**
 * Seam A (spec Testing Decisions): the auto-update domain against the real
 * service, a real settings table in a temp database, and the fake updater
 * that stands in for electron-updater at the `UpdateEnv` seam. Nothing here
 * touches Electron or the network - the whole platform split (ADR-0011) is
 * driven by the env's `platform`/`isPackaged`.
 */

interface FakeUpdater {
  /** The next check's outcome; a test replaces it to steer the check. */
  check: () => Promise<unknown>;
  /** The next download's behavior; a test replaces it to steer the download. */
  download: () => Promise<unknown>;
  readonly calls: { checks: number; downloads: number; installs: number };
  readonly adapter: UpdaterAdapter;
  /** Drives one updater event into the service's listeners. */
  emit: (event: string, payload: unknown) => void;
}

/**
 * The fake autoUpdater. The adapter is what the service sees; `check` and
 * `download` are the test's handles on the two promises, and `emit` is how
 * a test plays the download events a real updater fires.
 */
function fakeUpdater(): FakeUpdater {
  const listeners = new Map<string, (payload: unknown) => void>();
  const calls = { checks: 0, downloads: 0, installs: 0 };
  const fake: FakeUpdater = {
    check: () => Promise.resolve(null),
    download: () => Promise.resolve([]),
    calls,
    adapter: {
      autoDownload: false,
      allowPrerelease: false,
      on: (event, listener) => {
        listeners.set(event, listener);
      },
      checkForUpdates: () => {
        calls.checks += 1;
        return fake.check();
      },
      downloadUpdate: () => {
        calls.downloads += 1;
        return fake.download();
      },
      quitAndInstall: () => {
        calls.installs += 1;
      },
    },
    emit: (event, payload) => {
      listeners.get(event)?.(payload);
    },
  };
  return fake;
}

interface Harness {
  readonly db: Database.Database;
  readonly service: UpdateServiceShape;
  readonly updater: FakeUpdater;
  /** Every state the service pushed to its subscribers, in order. */
  readonly states: UpdateState[];
  /** Every URL the service handed to the OS browser. */
  readonly opened: string[];
  /** A settings row's stored value, or undefined when the row is absent. */
  readonly row: (key: string) => string | undefined;
}

/**
 * The service over a temp database. `db` lets a second harness impersonate
 * the next launch of the same profile (the version bookkeeping is per-row,
 * so a fresh service over the same rows is exactly what a relaunch is).
 */
function harness(overrides: Partial<UpdateEnv> = {}, db?: Database.Database): Harness {
  const database = db ?? openDatabase(join(tempDir(), "update.db"));
  const repo = makeSqliteRepo(
    database,
    makeCredentialCrypto(null, () => {}),
  );
  const updater = fakeUpdater();
  const opened: string[] = [];
  const env: UpdateEnv = {
    currentVersion: "1.0.0",
    platform: "win32",
    isPackaged: true,
    repo: UPDATE_REPO,
    hasActiveSendJob: () => Effect.succeed(false),
    updater: updater.adapter,
    openExternal: (url) =>
      Effect.sync(() => {
        opened.push(url);
      }),
    ...overrides,
  };
  const service = makeUpdateService(repo, env);
  const states: UpdateState[] = [];
  service.subscribe((state) => states.push(state));
  return {
    db: database,
    service,
    updater,
    states,
    opened,
    row: (key) => {
      const stored = database.prepare("SELECT value FROM settings WHERE key = ?").get(key) as
        | { value: string }
        | undefined;
      return stored?.value;
    },
  };
}

/** A check result that found nothing (the updater is current). */
const NO_UPDATE = {
  isUpdateAvailable: false,
  updateInfo: { version: "1.0.0" },
};

/** A check result that found a newer version. */
function found(version: string): unknown {
  return { isUpdateAvailable: true, updateInfo: { version } };
}

/**
 * The GitHub provider's "the feed carries no release" failure. 6.8.9 throws
 * it from its XML feed reader as a plain Error (the shape an empty feed
 * takes) and from its tag path under the updater's own code; both are
 * faked here because both are observed.
 */
function noPublishedVersions(coded: boolean): Error {
  const error = new Error("No published versions on GitHub");
  if (coded) Object.assign(error, { code: "ERR_UPDATER_NO_PUBLISHED_VERSIONS" });
  return error;
}

/** A feed that cannot be reached at all - the repository is gone or private. */
function httpNotFound(): Error {
  const error = new Error("HttpError: 404 Not Found");
  Object.assign(error, { statusCode: 404 });
  return error;
}

function run<A, E>(effect: Effect.Effect<A, E>): Promise<A> {
  return Effect.runPromise(effect);
}

describe("UpdateService (ticket 21)", () => {
  it("reports an unpackaged run as unsupported and never checks", async () => {
    const h = harness({ isPackaged: false });
    const state = await run(h.service.check());
    expect(state.status).toBe("unsupported");
    expect(state.canSelfInstall).toBe(true);
    expect(h.updater.calls.checks).toBe(0);
  });

  it("offers a found version on macOS without ever downloading it", async () => {
    const h = harness({ platform: "darwin" });
    h.updater.check = () => Promise.resolve(found("1.2.0"));

    const state = await run(h.service.check());
    expect(state.status).toBe("available");
    expect(state.availableVersion).toBe("1.2.0");
    expect(state.releaseUrl).toBe(`https://github.com/${UPDATE_REPO}/releases/tag/v1.2.0`);
    // The unsigned macOS build can never install its own update (ADR-0011):
    // notify and link, never download, never quit and install.
    expect(state.canSelfInstall).toBe(false);
    expect(h.updater.calls.downloads).toBe(0);
    await run(h.service.install());
    expect(h.updater.calls.installs).toBe(0);
  });

  it("reports up-to-date when the check finds nothing", async () => {
    const h = harness({ platform: "darwin" });
    h.updater.check = () => Promise.resolve(NO_UPDATE);
    const current = await run(h.service.check());
    expect(current.status).toBe("up-to-date");
    expect(current.availableVersion).toBeNull();

    // The updater also resolves null when it declined to check at all.
    h.updater.check = () => Promise.resolve(null);
    expect((await run(h.service.check())).status).toBe("up-to-date");
  });

  it("treats a feed with no release as up-to-date, not as a failure", async () => {
    const h = harness({ platform: "darwin" });
    // The plain Error its XML feed reader throws on an empty feed - the
    // shape the live, unreleased feed actually produced...
    h.updater.check = () => Promise.reject(noPublishedVersions(false));

    const state = await run(h.service.check());
    expect(state.status).toBe("up-to-date");
    expect(state.error).toBeNull();
    expect(h.states.map((pushed) => pushed.status)).toEqual(["checking", "up-to-date"]);

    // ...and the same text under the updater's own error code.
    h.updater.check = () => Promise.reject(noPublishedVersions(true));
    expect((await run(h.service.check())).status).toBe("up-to-date");
  });

  it("reports an unreachable feed as an error, not as up-to-date", async () => {
    // A 404 is the feed itself missing (repository renamed or made private).
    // Reporting that as "up to date" is how a broken feed goes unnoticed for
    // months - only the empty-but-reachable feed is a state, not a failure.
    const h = harness({ platform: "darwin" });
    h.updater.check = () => Promise.reject(httpNotFound());

    const state = await run(h.service.check());
    expect(state.status).toBe("error");
    expect(state.error).toBe(m["update.errorCheck"]({ message: "HttpError: 404 Not Found" }));
  });

  it("reports any other check failure as a localized error", async () => {
    const h = harness({ platform: "darwin" });
    h.updater.check = () => Promise.reject(new Error("getaddrinfo ENOTFOUND"));

    const state = await run(h.service.check());
    expect(state.status).toBe("error");
    expect(state.error).toBe(m["update.errorCheck"]({ message: "getaddrinfo ENOTFOUND" }));
  });

  it("treats a feed of drafts and pre-releases as nothing published", async () => {
    // What `releases/latest` answers while the only release is a draft: 406,
    // wrapped into this sentence. Pre-releases land here too, which is the
    // behaviour shipped builds want - they ignore pre-releases by design.
    const h = harness({ platform: "darwin" });
    h.updater.check = () =>
      Promise.reject(
        new Error(
          "Unable to find latest version on GitHub (https://github.com/ramaakbar/email-blast/releases/latest), please ensure a production release exists: HttpError: 406",
        ),
      );

    expect((await run(h.service.check())).status).toBe("up-to-date");
  });

  it("keeps the raw HTTP dump out of the user-facing failure", async () => {
    // electron-updater appends the whole response - headers, cookies, CSP -
    // to its message; a banner has room for one readable line.
    const h = harness({ platform: "darwin" });
    h.updater.check = () =>
      Promise.reject(
        new Error('connect ETIMEDOUT\nHeaders: {\n  "set-cookie": ["_gh_sess=..."]\n}'),
      );

    const state = await run(h.service.check());
    expect(state.status).toBe("error");
    expect(state.error).toBe(m["update.errorCheck"]({ message: "connect ETIMEDOUT" }));
  });

  it("downloads in the background on Windows and reports progress until it is ready", async () => {
    const h = harness();
    h.updater.check = () => Promise.resolve(found("1.2.0"));
    h.updater.download = () => {
      // Two chunk reports and the finish, exactly the events a real updater
      // fires; 40.4 rounds to the integer the renderer draws.
      h.updater.emit("download-progress", {
        percent: 12,
        total: 2,
        transferred: 1,
      });
      h.updater.emit("download-progress", {
        percent: 40.4,
        total: 2,
        transferred: 1,
      });
      h.updater.emit("update-downloaded", { version: "1.2.0" });
      return Promise.resolve([]);
    };

    const state = await run(h.service.check());
    expect(h.updater.calls.downloads).toBe(1);
    expect(state.availableVersion).toBe("1.2.0");
    expect(state.status).toBe("ready");
    expect(state.progress).toBeNull();
    expect(
      h.states.some((pushed) => pushed.status === "downloading" && pushed.progress === 40),
    ).toBe(true);
  });

  it("reports a failed download as a localized error and retries on demand", async () => {
    const h = harness();
    h.updater.check = () => Promise.resolve(found("1.2.0"));
    h.updater.download = () => Promise.reject(new Error("connection reset"));

    await run(h.service.check());
    const retried = await run(h.service.download());
    expect(retried.status).toBe("error");
    expect(retried.error).toBe(m["update.errorDownload"]({ message: "connection reset" }));
    expect(h.updater.calls.downloads).toBeGreaterThan(0);
  });

  it("stays silent for a dismissed version and re-nags on a newer one", async () => {
    const h = harness({ platform: "darwin" });
    h.updater.check = () => Promise.resolve(found("1.2.0"));
    await run(h.service.check());

    const dismissed = await run(h.service.dismiss("available"));
    expect(dismissed.status).toBe("idle");
    // The version stays in the state: it is the record the next check
    // compares its finding against.
    expect(dismissed.availableVersion).toBe("1.2.0");
    expect(h.row("update_dismissed_version")).toBe("1.2.0");

    // A later check of the same version stays silent.
    expect((await run(h.service.check())).status).toBe("idle");

    h.updater.check = () => Promise.resolve(found("1.3.0"));
    const newer = await run(h.service.check());
    expect(newer.status).toBe("available");
    expect(newer.availableVersion).toBe("1.3.0");
  });

  it("records the launch version and raises the what's-new notice only on a change", async () => {
    const h = harness();
    await run(h.service.recordLaunch());
    expect(h.row("last_run_version")).toBe("1.0.0");
    expect((await run(h.service.state())).whatsNew).toBeNull();

    // The next launch of the same version: still nothing to announce.
    const same = harness({}, h.db);
    await run(same.service.recordLaunch());
    expect((await run(same.service.state())).whatsNew).toBeNull();

    // The colleague updated by hand to 1.1.0: that launch announces it.
    const upgraded = harness({ currentVersion: "1.1.0" }, h.db);
    await run(upgraded.service.recordLaunch());
    expect(upgraded.row("last_run_version")).toBe("1.1.0");
    expect(upgraded.row("update_notice_version")).toBe("1.1.0");
    expect((await run(upgraded.service.state())).whatsNew).toBe("1.1.0");

    // An undismissed notice survives the restart ...
    const relaunched = harness({ currentVersion: "1.1.0" }, h.db);
    await run(relaunched.service.recordLaunch());
    expect((await run(relaunched.service.state())).whatsNew).toBe("1.1.0");

    // ... until it is dismissed, which is what clears it for good.
    const cleared = await run(relaunched.service.dismiss("whatsNew"));
    expect(cleared.whatsNew).toBeNull();
    expect(relaunched.row("update_notice_version")).toBe("");
    const after = harness({ currentVersion: "1.1.0" }, h.db);
    await run(after.service.recordLaunch());
    expect((await run(after.service.state())).whatsNew).toBeNull();
  });

  it("refuses to install while a send job is running", async () => {
    const busy = harness({ hasActiveSendJob: () => Effect.succeed(true) });
    busy.updater.check = () => Promise.resolve(found("1.2.0"));
    busy.updater.download = () => {
      busy.updater.emit("update-downloaded", { version: "1.2.0" });
      return Promise.resolve([]);
    };
    await run(busy.service.check());

    await run(busy.service.install());
    expect(busy.updater.calls.installs).toBe(0);
    // The refusal travels on the pushed state (the install response is null),
    // so it lands next to the Restart & install button.
    const refused = await run(busy.service.state());
    expect(refused.status).toBe("ready");
    expect(refused.error).toBe(m["update.errorActiveJob"]());

    // With nothing sending, the same click quits and installs.
    const free = harness();
    free.updater.check = () => Promise.resolve(found("1.2.0"));
    free.updater.download = () => {
      free.updater.emit("update-downloaded", { version: "1.2.0" });
      return Promise.resolve([]);
    };
    await run(free.service.check());
    await run(free.service.install());
    expect(free.updater.calls.installs).toBe(1);
    expect((await run(free.service.state())).error).toBeNull();
  });

  it("opens the found release's page, or the releases list before anything is found", async () => {
    const h = harness({ platform: "darwin" });
    await run(h.service.openRelease());
    expect(h.opened).toEqual([`https://github.com/${UPDATE_REPO}/releases`]);

    h.updater.check = () => Promise.resolve(found("1.2.0"));
    await run(h.service.check());
    await run(h.service.openRelease());
    expect(h.opened[1]).toBe(`https://github.com/${UPDATE_REPO}/releases/tag/v1.2.0`);
  });

  it("answers the frozen wire operations with the state the schema accepts", async () => {
    const h = harness({ platform: "darwin" });
    const context = Context.make(UpdateService, h.service);

    // getState is a 0-argument call whose response is encoded by the
    // handler against `UpdateState`, so this is the boundary the renderer
    // sees, not the raw in-memory object.
    const state = await makeHandler(updateOperations.getState, context)(null);
    expect(state).toEqual({
      status: "idle",
      currentVersion: "1.0.0",
      availableVersion: null,
      progress: null,
      canSelfInstall: false,
      releaseUrl: null,
      error: null,
      whatsNew: null,
    });

    // install answers nothing - its outcome is the state it pushes.
    await expect(makeHandler(updateOperations.install, context)(null)).resolves.toBeUndefined();

    // dismiss decodes its single argument against the frozen union ...
    await expect(makeHandler(updateOperations.dismiss, context)("whatsNew")).resolves.toEqual(
      expect.objectContaining({ whatsNew: null }),
    );
    // ... and rejects anything outside it at the boundary.
    expect(() => makeHandler(updateOperations.dismiss, context)("whenever")).toThrow();
  });
});
