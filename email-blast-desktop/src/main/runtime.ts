import { Layer } from "effect";
import { DatabaseSync } from "node:sqlite";
import { AppInfo } from "./services/app-info";
import type { DefaultPaths } from "./services/default-paths";
import { GenerateJobService } from "./services/generate-jobs";
import { ImportService } from "./services/import";
import { ProgressHub } from "./services/progress-hub";
import { RecipientsService } from "./services/recipients";
import { Settings } from "./services/settings";
import type { SqliteRepo } from "./services/sqlite-repo";
import { TemplatesService } from "./services/templates";

export type AppServices =
  | Settings
  | SqliteRepo
  | ImportService
  | RecipientsService
  | TemplatesService
  | GenerateJobService
  | ProgressHub
  | AppInfo;

/**
 * Root Layer of the main process - the composition root the Effect
 * runtime is built from. Later tickets attach their services here
 * (SmtpSender, JobRunner for send, ProgressHub for send events).
 */
export const rootLayer = (db: DatabaseSync, defaults: DefaultPaths): Layer.Layer<AppServices> =>
  Layer.mergeAll(
    Settings.Live(db, defaults),
    ImportService.Live(db),
    RecipientsService.Live(db),
    TemplatesService.Live(db),
    GenerateJobService.Live(db, defaults),
    AppInfo.Live,
  );
