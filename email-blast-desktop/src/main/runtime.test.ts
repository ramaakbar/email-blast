import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import { rootLayer } from "./runtime";
import { AppInfo } from "./services/app-info";

/**
 * Seam A (spec Testing Decisions): the main-process Layer program,
 * headless. This smoke test proves the Effect runtime initializes -
 * one service layer composes and resolves against the real rootLayer
 * the app boots from.
 */
describe("Seam A: main-process Effect runtime", () => {
  it("composes the root layer and resolves the AppInfo service", async () => {
    const info = await Effect.runPromise(
      Effect.gen(function* () {
        return yield* AppInfo;
      }).pipe(Effect.provide(rootLayer)),
    );

    expect(info).toEqual({ name: "email-blast-desktop", version: "1.0.0" });
  });
});
