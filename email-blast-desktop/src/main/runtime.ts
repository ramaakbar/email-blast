import { Layer } from "effect";
import { DatabaseSync } from "node:sqlite";
import { AppInfo } from "./services/app-info";
import type { DefaultPaths } from "./services/default-paths";
import { Settings } from "./services/settings";
import type { SqliteRepo } from "./services/sqlite-repo";

export type AppServices = Settings | SqliteRepo | AppInfo;

/**
 * Root Layer of the main process - the composition root the Effect
 * runtime is built from. Later tickets attach their services here
 * (SmtpSender, TemplatePipeline, JobRunner, ProgressHub).
 */
export const rootLayer = (db: DatabaseSync, defaults: DefaultPaths): Layer.Layer<AppServices> =>
  Layer.mergeAll(Settings.Live(db, defaults), AppInfo.Live);
