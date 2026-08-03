import { Context, Effect, Layer, Option } from "effect";
import { DatabaseSync } from "node:sqlite";
import type {
  ImportBatch,
  PaginatedRecipients,
  Recipient,
  RecipientListAllPayload,
  RecipientListPayload,
} from "../../shared/ipc";
import { SqliteRepo, type SqliteRepoShape } from "./sqlite-repo";

/**
 * The recipients directory (ticket 11): listing with search/filter/
 * pagination, single-row reads, and bulk delete. The SQL lives in
 * SqliteRepo; this service is the domain boundary the IPC handlers and
 * later tickets (compose recipient selection, job detail joins) build on.
 */
export interface RecipientsServiceShape {
  /** One page of recipients matching the search text and import-batch filter. */
  readonly list: (filter: RecipientListPayload) => Effect.Effect<PaginatedRecipients>;
  /** A single recipient by id, or none when no such id exists. */
  readonly get: (id: string) => Effect.Effect<Option.Option<Recipient>>;
  /** Deletes the given ids and returns how many rows were removed. */
  readonly delete: (ids: readonly string[]) => Effect.Effect<number>;
  /** Every distinct import batch, newest first, with its stamp and size. */
  readonly listBatches: () => Effect.Effect<ImportBatch[]>;
  /**
   * Every recipient matching the search text and import-batch filter,
   * unpaginated - the compose wizard's select-all (ticket 13).
   */
  readonly listAll: (filter: RecipientListAllPayload) => Effect.Effect<Recipient[]>;
}

export function makeRecipientsService(repo: SqliteRepoShape): RecipientsServiceShape {
  return {
    list: (filter) =>
      Effect.gen(function* () {
        const { items, total } = yield* repo.listRecipients(filter);
        return { items, total, page: filter.page, pageSize: filter.pageSize };
      }),
    get: (id) => repo.getRecipient(id),
    delete: (ids) => repo.deleteRecipients(ids),
    listBatches: () => repo.listImportBatches(),
    listAll: (filter) => repo.listAllRecipients(filter),
  };
}

/**
 * The recipients domain service. Constructing this layer provides
 * SqliteRepo alongside, so a program can depend on either.
 */
export class RecipientsService extends Context.Service<RecipientsService, RecipientsServiceShape>()(
  "RecipientsService",
) {
  static readonly Live = (db: DatabaseSync): Layer.Layer<RecipientsService | SqliteRepo> =>
    Layer.provideMerge(
      Layer.effect(
        RecipientsService,
        Effect.gen(function* () {
          const repo = yield* SqliteRepo;
          return makeRecipientsService(repo);
        }),
      ),
      SqliteRepo.Live(db),
    );
}
