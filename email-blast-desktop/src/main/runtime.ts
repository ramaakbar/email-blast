import { Layer } from "effect";
import Database from "better-sqlite3";
import { AppInfo } from "./services/app-info";
import type { DefaultPaths } from "./services/default-paths";
import { GenerateJobService } from "./services/generate-jobs";
import { ImportService } from "./services/import";
import { ProgressHub } from "./services/progress-hub";
import { RecipientsService } from "./services/recipients";
import { SendJobService } from "./services/send-jobs";
import { Settings } from "./services/settings";
import { SmtpService } from "./services/smtp";
import type { SqliteRepo } from "./db/repository";
import { TemplatesService } from "./services/templates";

export type AppServices =
  | Settings
  | SqliteRepo
  | ImportService
  | RecipientsService
  | TemplatesService
  | GenerateJobService
  | SendJobService
  | SmtpService
  | ProgressHub
  | AppInfo;

/**
 * Root Layer of the main process - the composition root the Effect
 * runtime is built from. SendJobService brings the send pipeline
 * (ticket 15); its Live layer provides GenerateJob, Smtp, ProgressHub,
 * Settings, and SqliteRepo alongside, so the duplicates merge away.
 */
export const rootLayer = (
  db: Database.Database,
  defaults: DefaultPaths,
): Layer.Layer<AppServices> =>
  Layer.mergeAll(
    Settings.Live(db, defaults),
    ImportService.Live(db),
    RecipientsService.Live(db),
    TemplatesService.Live(db),
    SendJobService.Live(db, defaults),
    AppInfo.Live,
  );
