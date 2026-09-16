import { Layer } from "effect";
import Database from "better-sqlite3";
import { AppInfo } from "./services/app-info";
import type { CredentialCrypto } from "./services/credential-crypto";
import type { DefaultPaths } from "./services/default-paths";
import { GenerateEnvService, GenerateJobService } from "./services/generate-jobs";
import { ImportService } from "./services/import";
import { LibreOfficeService } from "./services/libreoffice";
import { ProgressHub } from "./services/progress-hub";
import { RecipientsService } from "./services/recipients";
import { SendEnvService, SendJobService } from "./services/send-jobs";
import { Settings } from "./services/settings";
import { SmtpService } from "./services/smtp";
import type { SqliteRepo } from "./db/repository";
import { MessageTemplatesService } from "./services/message-templates";
import { TemplatesService } from "./services/templates";
import { FontManagerService, type FontDirs } from "./services/fonts";
import { UpdateEnvService, UpdateService } from "./services/update";

export type AppServices =
  | Settings
  | SqliteRepo
  | ImportService
  | RecipientsService
  | TemplatesService
  | MessageTemplatesService
  | GenerateJobService
  | GenerateEnvService
  | LibreOfficeService
  | SendJobService
  | SendEnvService
  | SmtpService
  | ProgressHub
  | AppInfo
  | FontManagerService
  | UpdateService
  | UpdateEnvService;

/**
 * Root Layer of the main process - the composition root the Effect
 * runtime is built from. SendJobService brings the send pipeline
 * (ticket 15); its Live layer provides GenerateJob, Smtp, ProgressHub,
 * Settings, and SqliteRepo alongside, so the duplicates merge away.
 * FontManagerService (ticket 11) is the fonts domain: the bundled
 * faces plus the uploads persisted in the app data dir.
 *
 * The two sides of the provideMerge are the requirement split, not the
 * domains: the send pipeline (and the font manager its generate env
 * resolves faces through) is built on the providing side, the surface
 * domains on the other. UpdateService (ticket 21) sits there because its
 * Live env queries the send service's active job; that way both the
 * update domain and the send pipeline run on the ONE SendJobService
 * instance the app coordinates through, instead of a second copy with
 * its own progress hub and quit latch.
 */
export const rootLayer = (
  db: Database.Database,
  defaults: DefaultPaths,
  systemLocale: string = "en",
  credCrypto: CredentialCrypto,
  fontDirs: FontDirs,
): Layer.Layer<AppServices> =>
  // The font manager satisfies the generate env's face resolution
  // (ticket 11); provideMerge cancels that requirement where mergeAll
  // leaves it dangling in the beta's type computation.
  Layer.provideMerge(
    Layer.mergeAll(
      Settings.Live(db, defaults, systemLocale, credCrypto),
      ImportService.Live(db, credCrypto),
      RecipientsService.Live(db, credCrypto),
      TemplatesService.Live(db, credCrypto),
      MessageTemplatesService.Live(db, credCrypto),
      UpdateService.Live(db, credCrypto),
      AppInfo.Live,
    ),
    Layer.provideMerge(
      SendJobService.Live(db, defaults, credCrypto),
      FontManagerService.Live(fontDirs),
    ),
  );
