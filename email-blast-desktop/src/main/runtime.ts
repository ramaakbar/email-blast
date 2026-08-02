import { Layer } from "effect";
import { AppInfo } from "./services/app-info";

/**
 * Root Layer of the main process - the composition root the Effect
 * runtime is built from. Later tickets attach their services here
 * (SqliteRepo, SmtpSender, TemplatePipeline, JobRunner, ProgressHub).
 */
export const rootLayer: Layer.Layer<AppInfo> = AppInfo.Live;
