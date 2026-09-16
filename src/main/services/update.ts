import { Context, Effect, Layer, Option } from "effect";
import { m } from "@paraglide/messages";
import { app, shell } from "electron";
import { autoUpdater } from "electron-updater";
import Database from "better-sqlite3";
import { UpdateDismissPayload, UpdateState, type UpdateStatus } from "../../shared/ipc";
import { SETTING_KEYS } from "../../shared/settings";
import { WIRE } from "../../shared/wire";
import { makeOp } from "../ipc-core";
import { SqliteRepo, type SqliteRepoShape } from "../db/repository";
import type { CredentialCrypto } from "./credential-crypto";
import { SendJobService } from "./send-jobs";

/**
 * The auto-update domain (ticket 21, ADR-0011). Distribution is the public
 * GitHub Releases feed of `ramaakbar/email-blast` and the build is unsigned,
 * so the platforms split: Windows downloads the installer in the background
 * and installs it on one explicit click, macOS can only ever notify and open
 * the release page (Squirrel.Mac validates the downloaded bundle against the
 * running app's designated requirement, which an unsigned build never
 * satisfies). Nothing ever installs behind the user's back.
 */

/** The public feed's owner/repo (ADR-0011) - the release links point here. */
export const UPDATE_REPO = "ramaakbar/email-blast";

/**
 * The part of electron-updater's `autoUpdater` this domain uses
 * (ADR-0011's platform split is what keeps it this small). Structural so a
 * test drives a fake through the same seam the Live env fills with the
 * singleton. Event payloads stay `unknown`: they are electron-updater's own
 * objects, so the listeners below narrow what they read instead of trusting
 * a fabricated shape.
 */
export interface UpdaterAdapter {
  /** Electron-updater's own auto-download stays OFF: the service decides when. */
  autoDownload: boolean;
  /** Pre-releases are the test channel, invisible to shipped builds (ADR-0011). */
  allowPrerelease: boolean;
  on(event: string, listener: (payload: unknown) => void): void;
  /** Resolves null when the updater is inactive, otherwise the check result. */
  checkForUpdates(): Promise<unknown>;
  downloadUpdate(): Promise<unknown>;
  quitAndInstall(): void;
}

/**
 * What the domain needs from outside itself - the DI seam that keeps the
 * service testable without Electron or a network.
 */
export interface UpdateEnv {
  /** `app.getVersion()` - the version this build runs. */
  readonly currentVersion: string;
  /** `process.platform`; only "win32" can install an update itself (ADR-0011). */
  readonly platform: string;
  /** `app.isPackaged`: an unpackaged (dev) build cannot update at all. */
  readonly isPackaged: boolean;
  /** The release repository the links point at. */
  readonly repo: string;
  /** Whether a send job is in flight - the install refusal (ticket 17). */
  readonly hasActiveSendJob: () => Effect.Effect<boolean>;
  readonly updater: UpdaterAdapter;
  readonly openExternal: (url: string) => Effect.Effect<void>;
}

/**
 * The live environment: electron-updater's singleton, the Electron app
 * identity, the OS browser, and the send service's active-job query (no
 * cycle - SendJobService never depends on this domain).
 *
 * The Electron bindings are read lazily, through accessors. `app.getVersion`
 * and electron-updater's platform singleton both need a live Electron app,
 * while the root layer is composed headlessly too (runtime.test.ts builds it
 * against a temp database), so composing the graph must not touch either.
 * A real run reads them at the first update query - a state read, a check,
 * or an install.
 */
export class UpdateEnvService extends Context.Service<UpdateEnvService, UpdateEnv>()(
  "UpdateEnvService",
) {
  static readonly Live: Layer.Layer<UpdateEnvService, never, SendJobService> = Layer.effect(
    UpdateEnvService,
    Effect.gen(function* () {
      const sendJobs = yield* SendJobService;
      return {
        get currentVersion() {
          return app.getVersion();
        },
        platform: process.platform,
        get isPackaged() {
          return app.isPackaged;
        },
        repo: UPDATE_REPO,
        hasActiveSendJob: () => sendJobs.activeJobSummary().pipe(Effect.map(Option.isSome)),
        get updater() {
          // electron-updater's own auto-download stays OFF - the service
          // decides when to download, not the check that found a version -
          // and pre-releases are the test channel, invisible to shipped
          // builds (ADR-0011). Both are pinned on every access, so nothing
          // later can flip them.
          autoUpdater.autoDownload = false;
          autoUpdater.allowPrerelease = false;
          return autoUpdater;
        },
        openExternal: (url) => Effect.promise(() => shell.openExternal(url)),
      };
    }),
  );
}

export interface UpdateServiceShape {
  /**
   * The version bookkeeping read at boot (ADR-0011): the row pair that
   * answers "is this a first run, an updated run, or the same run again".
   */
  readonly recordLaunch: () => Effect.Effect<void>;
  /** The current state - the source of truth the pushed states mirror. */
  readonly state: () => Effect.Effect<UpdateState>;
  /** Runs a check now and resolves with the state it produced. */
  readonly check: () => Effect.Effect<UpdateState>;
  /**
   * The explicit/retry download. A no-op resolving the unchanged state
   * where nothing can be installed (macOS) or nothing was found.
   */
  readonly download: () => Effect.Effect<UpdateState>;
  /** Quits and installs the downloaded update (Windows only). */
  readonly install: () => Effect.Effect<void>;
  /** Opens the available release's page, or the releases list when none is known. */
  readonly openRelease: () => Effect.Effect<void>;
  /** Silences the available-version nag or the one-time what's-new notice. */
  readonly dismiss: (what: UpdateDismissPayload) => Effect.Effect<UpdateState>;
  /** Subscribes to state changes; returns the unsubscribe function. */
  readonly subscribe: (listener: (state: UpdateState) => void) => () => void;
}

/** The stored rows use an empty string as "cleared" - the repo has no delete. */
function blankToNull(value: string | null): string | null {
  return value === null || value === "" ? null : value;
}

/**
 * The version a check result reports, or null when the updater found
 * nothing. electron-updater fills `updateInfo.version` on every result it
 * produces and `isUpdateAvailable: false` when the running build is current.
 */
function availableVersionOf(result: unknown): string | null {
  if (result === null || typeof result !== "object" || !("updateInfo" in result)) return null;
  const updateInfo = result.updateInfo;
  if (updateInfo === null || typeof updateInfo !== "object" || !("version" in updateInfo)) {
    return null;
  }
  const { version } = updateInfo;
  if (typeof version !== "string" || version === "") return null;
  return "isUpdateAvailable" in result && result.isUpdateAvailable === false ? null : version;
}

/**
 * The failure detail a localized message interpolates: the first line only.
 * electron-updater appends the raw HTTP response - headers, set-cookie, CSP -
 * to its messages, which must never reach a banner or the Settings row.
 */
function describeCause(cause: unknown): string {
  const message = cause instanceof Error ? cause.message : String(cause);
  const firstLine = message.split("\n", 1)[0]!.trim();
  return firstLine.length > 200 ? `${firstLine.slice(0, 197)}...` : firstLine;
}

/**
 * The failure texts that mean "the feed carries nothing to install yet".
 * electron-updater 6.8.9 says `No published versions on GitHub` for an empty
 * releases feed, and `please ensure a production release exists` when
 * `releases/latest` cannot resolve a tag - which is what a feed holding only
 * drafts or pre-releases looks like from a client. Both are states rather
 * than failures: there is nothing newer to get.
 */
const NOTHING_PUBLISHED = [/no published versions/i, /please ensure a production release exists/i];

/** The `percent` a download-progress payload carries, or null when it is not one. */
function progressPercent(payload: unknown): number | null {
  if (typeof payload !== "object" || payload === null || !("percent" in payload)) return null;
  const { percent } = payload;
  return typeof percent === "number" && Number.isFinite(percent) ? percent : null;
}

/** The version an updater event payload carries, or null when it carries none. */
function payloadVersion(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null || !("version" in payload)) return null;
  const { version } = payload;
  return typeof version === "string" && version !== "" ? version : null;
}

export function makeUpdateService(repo: SqliteRepoShape, env: UpdateEnv): UpdateServiceShape {
  const canSelfInstall = env.platform === "win32";
  const listeners = new Set<(state: UpdateState) => void>();

  // The in-memory half of the state. The found version lives here only: it
  // describes THIS run's checks, and the dismissed comparison below is what
  // lets a newer version re-nag. The two stored versions (the notice and the
  // dismissal) survive restarts and are loaded by recordLaunch at boot.
  //
  // `status` starts unresolved: an unpackaged (dev) run cannot update at
  // all, and deciding that reads `app.isPackaged`, which needs a live
  // Electron app - the root layer is composed headlessly in tests, so the
  // first read resolves it instead of the construction doing so.
  let status: UpdateStatus | null = null;
  let foundVersion: string | null = null;
  let progress: number | null = null;
  let error: string | null = null;
  let noticeVersion: string | null = null;
  let dismissedVersion: string | null = null;
  let downloadInFlight: Promise<void> | null = null;

  const currentStatus = (): UpdateStatus => (status ??= env.isPackaged ? "idle" : "unsupported");

  const releaseUrlFor = (version: string): string =>
    `https://github.com/${env.repo}/releases/tag/v${version}`;
  const releasesUrl = `https://github.com/${env.repo}/releases`;

  /**
   * The state as the renderer sees it. The frozen `UpdateState` has no
   * `dismissed` field, so the dismissed version is expressed through the
   * status: the found version stays in `availableVersion` (the record the
   * next check compares against) while the status drops to `idle`, leaving
   * the renderer nothing to show.
   */
  const buildState = (): UpdateState => ({
    status:
      currentStatus() === "available" && foundVersion !== null && foundVersion === dismissedVersion
        ? "idle"
        : currentStatus(),
    currentVersion: env.currentVersion,
    availableVersion: foundVersion,
    progress,
    canSelfInstall,
    releaseUrl: foundVersion === null ? null : releaseUrlFor(foundVersion),
    error,
    whatsNew: noticeVersion,
  });

  /**
   * Pushes the full state to every subscriber and returns it, so a
   * transition and its propagation can never drift apart. The subscription
   * side is synchronous and loss-free; the renderer treats a miss as
   * recovered by its next `getState` (which is the source of truth), so
   * there is no queue here - exactly the progress hub's contract.
   */
  const emit = (): UpdateState => {
    const state = buildState();
    for (const listener of listeners) listener(state);
    return state;
  };

  /**
   * The updater, bound on first real use. Reaching electron-updater's
   * singleton constructs it (it needs a live Electron app), and the
   * listeners belong to the same moment: the root layer is composed
   * headlessly in tests, where nothing may touch it, while a real run binds
   * it on the first check - before any event could fire.
   *
   * The check's resolved result carries everything a check concludes, so
   * `update-available`/`update-not-available` have no listener: a second
   * path mutating the same fields would only race the first. What the
   * result does NOT carry is the download it started, which is what the two
   * download events below are for.
   */
  let bound = false;
  const updater = (): UpdaterAdapter => {
    const adapter = env.updater;
    if (bound) return adapter;
    bound = true;
    adapter.on("download-progress", (payload) => {
      if (currentStatus() !== "downloading") return;
      const reported = progressPercent(payload);
      if (reported === null) return;
      const percent = Math.min(100, Math.max(0, Math.round(reported)));
      // electron-updater reports per chunk; a percent the renderer would
      // draw identically is not worth an IPC message.
      if (percent === progress) return;
      progress = percent;
      emit();
    });
    adapter.on("update-downloaded", (payload) => {
      // The event's own version is authoritative when it carries one; the
      // check's found version is the fallback.
      const downloaded = payloadVersion(payload);
      if (downloaded !== null) foundVersion = downloaded;
      status = "ready";
      progress = null;
      emit();
    });
    adapter.on("error", (cause) => {
      // No state change: every failure this service can observe also
      // rejects the promise it is awaiting, and that path owns the
      // transition. The listener exists because an EventEmitter with no
      // `error` listener throws instead of reporting. The raw text goes to
      // the log in full; only the user-facing state trims it.
      console.log(
        `[update] updater error: ${cause instanceof Error ? cause.message : String(cause)}`,
      );
    });
    return adapter;
  };

  /**
   * Runs one download to completion in the background. A second call joins
   * the in-flight one: electron-updater rejects a concurrent download, and
   * the check's auto-download and the user's explicit retry are the same
   * download.
   */
  const runDownload = (): Promise<void> => {
    if (downloadInFlight !== null) return downloadInFlight;
    status = "downloading";
    progress = 0;
    error = null;
    emit();
    downloadInFlight = updater()
      .downloadUpdate()
      .then(() => {
        // The `update-downloaded` event says the same thing; resolving must
        // too, so a missed event can never strand the state as `downloading`.
        if (currentStatus() === "downloading") {
          status = "ready";
          progress = null;
          emit();
        }
      })
      .catch((cause: unknown) => {
        status = "error";
        progress = null;
        error = m["update.errorDownload"]({ message: describeCause(cause) });
        emit();
      })
      .finally(() => {
        downloadInFlight = null;
      });
    return downloadInFlight;
  };

  /** The updater's check promise as an outcome - a rejected check is a state, not a fault. */
  const checkOnce = async (): Promise<
    { ok: true; result: unknown } | { ok: false; cause: unknown }
  > => {
    try {
      return { ok: true, result: await updater().checkForUpdates() };
    } catch (cause) {
      return { ok: false, cause };
    }
  };

  return {
    recordLaunch: () =>
      Effect.gen(function* () {
        // The boot read of the update bookkeeping. It happens before any
        // window exists (the composition root awaits it), so `state()` and
        // `check()` always see the persisted rows without a round-trip.
        dismissedVersion = blankToNull(
          Option.getOrNull(yield* repo.getSetting(SETTING_KEYS.updateDismissedVersion)),
        );
        noticeVersion = blankToNull(
          Option.getOrNull(yield* repo.getSetting(SETTING_KEYS.updateNoticeVersion)),
        );
        const lastRun = Option.getOrNull(yield* repo.getSetting(SETTING_KEYS.lastRunVersion));
        if (lastRun === env.currentVersion) {
          // Same version as last launch: a notice the user never dismissed
          // stays until dismiss("whatsNew") clears it.
          return emit();
        }
        if (lastRun === null) {
          // First run: this version is the baseline, so nothing "changed"
          // into it and there is nothing to announce.
          yield* repo.setSetting(SETTING_KEYS.lastRunVersion, env.currentVersion);
          return emit();
        }
        // The version moved: this launch is the "app was updated" notice the
        // user asked for. The notice row is written first - a crash between
        // the two writes then only repeats the notice on the next launch
        // instead of losing it.
        noticeVersion = env.currentVersion;
        yield* repo.setSetting(SETTING_KEYS.updateNoticeVersion, env.currentVersion);
        yield* repo.setSetting(SETTING_KEYS.lastRunVersion, env.currentVersion);
        return emit();
      }),

    state: () => Effect.sync(buildState),

    check: () =>
      Effect.gen(function* () {
        if (!env.isPackaged) {
          // electron-updater only runs in a packaged app (a dev build has no
          // app-update.yml); report that honestly instead of failing a check,
          // and never touch the network from here.
          status = "unsupported";
          error = null;
          progress = null;
          return emit();
        }
        status = "checking";
        error = null;
        progress = null;
        emit();
        const outcome = yield* Effect.promise(checkOnce);
        if (!outcome.ok) {
          const { cause } = outcome;
          const causeMessage = describeCause(cause);
          // Nothing published yet (an empty feed, or one holding only drafts
          // and pre-releases): there is nothing newer to get, so this is
          // "up to date" rather than a failure the user could act on.
          // A 404 stays an ERROR on purpose: that is the feed itself being
          // gone (repository renamed, made private), which is exactly what
          // the maintainer must hear about.
          const nothingPublished =
            NOTHING_PUBLISHED.some((pattern) => pattern.test(causeMessage)) ||
            (typeof cause === "object" &&
              cause !== null &&
              "code" in cause &&
              cause.code === "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
          if (nothingPublished) {
            foundVersion = null;
            status = "up-to-date";
            console.log(`[update] nothing published yet: ${causeMessage}`);
          } else {
            status = "error";
            error = m["update.errorCheck"]({ message: causeMessage });
          }
          return emit();
        }
        const version = availableVersionOf(outcome.result);
        if (version === null) {
          foundVersion = null;
          status = "up-to-date";
          return emit();
        }
        foundVersion = version;
        if (!canSelfInstall || version === dismissedVersion) {
          // macOS: notify and link, never download what cannot be installed
          // (ADR-0011). Dismissed: keep the record for the next check's
          // comparison, but stay quiet and start no download.
          status = "available";
          return emit();
        }
        // Windows: the download starts behind the check, so the banner it
        // produces already carries Restart & install.
        void runDownload();
        return buildState();
      }),

    download: () =>
      Effect.gen(function* () {
        if (!canSelfInstall || foundVersion === null) return buildState();
        const inFlight = runDownload();
        yield* Effect.promise(() => inFlight);
        return buildState();
      }),

    install: () =>
      Effect.gen(function* () {
        // Windows only: an unsigned macOS bundle can never apply an update
        // to itself (ADR-0011).
        if (!canSelfInstall) return;
        if (yield* env.hasActiveSendJob()) {
          // Installing quits the app; mid-send that fights the ticket-17
          // quit guard and strands the job. The frozen install response is
          // null, so the refusal travels on the pushed state, where the
          // banner shows it next to the button.
          error = m["update.errorActiveJob"]();
          emit();
          return;
        }
        // Nothing downloaded: electron-updater would refuse the install.
        if (currentStatus() !== "ready") return;
        error = null;
        emit();
        updater().quitAndInstall();
      }),

    openRelease: () =>
      Effect.gen(function* () {
        yield* env.openExternal(foundVersion === null ? releasesUrl : releaseUrlFor(foundVersion));
      }),

    dismiss: (what) =>
      Effect.gen(function* () {
        if (what === "whatsNew") {
          noticeVersion = null;
          yield* repo.setSetting(SETTING_KEYS.updateNoticeVersion, "");
          return emit();
        }
        // "available" silences the not-yet-downloaded nag only. Once the
        // download is running or done the update is an installable fact, and
        // silencing it would strand a downloaded installer with no way back
        // to the button, so those states are left alone.
        if (currentStatus() === "available" && foundVersion !== null) {
          dismissedVersion = foundVersion;
          yield* repo.setSetting(SETTING_KEYS.updateDismissedVersion, foundVersion);
          status = "idle";
        }
        return emit();
      }),

    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/**
 * The update domain service. Constructing this layer provides
 * UpdateEnvService and SqliteRepo alongside, so a program can depend on
 * either; the Live env needs the send service (the install refusal).
 */
export class UpdateService extends Context.Service<UpdateService, UpdateServiceShape>()(
  "UpdateService",
) {
  static readonly Live = (
    db: Database.Database,
    credCrypto: CredentialCrypto,
  ): Layer.Layer<UpdateService | UpdateEnvService | SqliteRepo, never, SendJobService> =>
    Layer.provideMerge(
      Layer.provideMerge(
        Layer.effect(
          UpdateService,
          Effect.gen(function* () {
            const repo = yield* SqliteRepo;
            const env = yield* UpdateEnvService;
            return makeUpdateService(repo, env);
          }),
        ),
        UpdateEnvService.Live,
      ),
      SqliteRepo.Live(db, credCrypto),
    );
}

/**
 * The update domain's IPC operations (ticket 21). `install` and
 * `openRelease` answer nothing - their outcome is the state they push.
 */
export const updateOperations = {
  getState: makeOp(WIRE.update.getState, null, UpdateState, () =>
    Effect.gen(function* () {
      const service = yield* UpdateService;
      return yield* service.state();
    }),
  ),
  check: makeOp(WIRE.update.check, null, UpdateState, () =>
    Effect.gen(function* () {
      const service = yield* UpdateService;
      return yield* service.check();
    }),
  ),
  download: makeOp(WIRE.update.download, null, UpdateState, () =>
    Effect.gen(function* () {
      const service = yield* UpdateService;
      return yield* service.download();
    }),
  ),
  install: makeOp(WIRE.update.install, null, null, () =>
    Effect.gen(function* () {
      const service = yield* UpdateService;
      yield* service.install();
    }),
  ),
  openRelease: makeOp(WIRE.update.openRelease, null, null, () =>
    Effect.gen(function* () {
      const service = yield* UpdateService;
      yield* service.openRelease();
    }),
  ),
  dismiss: makeOp(WIRE.update.dismiss, UpdateDismissPayload, UpdateState, (what) =>
    Effect.gen(function* () {
      const service = yield* UpdateService;
      return yield* service.dismiss(what);
    }),
  ),
};
