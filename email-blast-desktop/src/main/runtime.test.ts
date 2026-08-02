import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import { join } from "path";
import { rootLayer } from "./runtime";
import { AppInfo } from "./services/app-info";
import { defaultPathsForHome } from "./services/default-paths";
import { openDatabase } from "./services/sqlite-repo";
import { tempDir } from "./services/test-helpers";

/**
 * Seam A (spec Testing Decisions): the main-process Layer program,
 * headless. This smoke test proves the Effect runtime initializes -
 * the full root layer (database + settings + app info) composes and
 * resolves against a temp database, exactly like the app boots it.
 */

describe("Seam A: main-process Effect runtime", () => {
  it("composes the root layer and resolves the AppInfo service", async () => {
    const home = tempDir();
    const db = openDatabase(join(home, "test.db"));
    const layer = rootLayer(db, defaultPathsForHome(home));

    const info = await Effect.runPromise(
      Effect.gen(function* () {
        return yield* AppInfo;
      }).pipe(Effect.provide(layer)),
    );

    expect(info).toEqual({ name: "email-blast-desktop", version: "1.0.0" });
    db.close();
  });
});
