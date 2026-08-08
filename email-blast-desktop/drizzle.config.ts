import { defineConfig } from "drizzle-kit";

/**
 * drizzle-kit wiring (ADR-0002, ticket 22): future schema changes are
 * generated against src/main/db/schema.ts into drizzle/ and applied by
 * the app at open (see openDatabase in src/main/db/repository.ts).
 *
 *   pnpm db:generate   - diff the schema, write the next migration
 *   pnpm db:push       - apply the schema to the dev database directly
 *
 * `generate` never connects; `push`/`studio` need a driver and use
 * better-sqlite3 (a runtime dependency, so it is always present).
 */
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/main/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "./dev.db",
  },
});
