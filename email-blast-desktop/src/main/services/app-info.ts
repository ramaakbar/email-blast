import { Context, Layer } from "effect";

/**
 * Static identity of the app as the main process sees it.
 * The first service in the root Layer - proves the Effect runtime
 * initializes and composes (Seam A smoke test).
 */
export class AppInfo extends Context.Service<
  AppInfo,
  {
    readonly name: string;
    readonly version: string;
  }
>()("AppInfo") {
  static readonly Live: Layer.Layer<AppInfo> = Layer.succeed(AppInfo, {
    name: "email-blast-desktop",
    version: "1.0.0",
  });
}
