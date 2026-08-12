import { Context, Data, Effect, Layer, Option, Schema } from "effect";
import Database from "better-sqlite3";
import {
  ImportBatch,
  PaginatedRecipients,
  Recipient,
  RecipientDeletePayload,
  RecipientDeleteResponse,
  RecipientListAllPayload,
  RecipientListPayload,
  RecipientUpdatePayload,
} from "../../shared/ipc";
import { validateRecipientEdit } from "../../shared/recipient-edit";
import { WIRE } from "../../shared/wire";
import { makeOp } from "../ipc-core";
import { SqliteRepo, type SqliteRepoShape } from "../db/repository";
import type { CredentialCrypto } from "./credential-crypto";

/** An edit that fails validation (empty name, email without @). */
export class InvalidRecipientEdit extends Data.TaggedError("InvalidRecipientEdit")<{
  readonly message: string;
}> {}

/** Editing a recipient whose id no longer exists (deleted since it was fetched). */
export class RecipientNotFound extends Data.TaggedError("RecipientNotFound")<{}> {}

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
  /**
   * Edits a recipient's name, email, and phone (ADR 0008). Same rules as
   * import (name required, email/phone optional) plus a light "must
   * contain @" check on the email - edit-only, import stays permissive.
   */
  readonly update: (
    payload: RecipientUpdatePayload,
  ) => Effect.Effect<Recipient, InvalidRecipientEdit | RecipientNotFound>;
  /** Deletes the given ids and returns how many rows were removed. */
  readonly delete: (ids: readonly string[]) => Effect.Effect<number>;
  /** Every distinct import batch, newest first, with its stamp and size. */
  readonly listBatches: () => Effect.Effect<ImportBatch[]>;
  /**
   * Every recipient matching the search text and import-batch filter,
   * unpaginated - the workspaces' select-all (ticket 13).
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
    update: (payload) =>
      Effect.gen(function* () {
        const error = validateRecipientEdit(payload.name, payload.email);
        if (error !== null) return yield* Effect.fail(new InvalidRecipientEdit({ message: error }));
        const updated = yield* repo.updateRecipient(payload.id, {
          name: payload.name.trim(),
          email: payload.email,
          phone: payload.phone,
        });
        if (Option.isNone(updated)) return yield* Effect.fail(new RecipientNotFound());
        return updated.value;
      }),
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
  static readonly Live = (
    db: Database.Database,
    credCrypto: CredentialCrypto,
  ): Layer.Layer<RecipientsService | SqliteRepo> =>
    Layer.provideMerge(
      Layer.effect(
        RecipientsService,
        Effect.gen(function* () {
          const repo = yield* SqliteRepo;
          return makeRecipientsService(repo);
        }),
      ),
      SqliteRepo.Live(db, credCrypto),
    );
}

/**
 * The recipients domain's IPC operations: paged listing with
 * search/filter, single reads, bulk delete, import-batch listing, and
 * the unpaginated select-all the workspaces use.
 */
export const recipientsOperations = {
  list: makeOp(WIRE.recipients.list, RecipientListPayload, PaginatedRecipients, (filter) =>
    Effect.gen(function* () {
      const service = yield* RecipientsService;
      return yield* service.list(filter);
    }),
  ),
  get: makeOp(WIRE.recipients.get, Schema.String, Schema.NullOr(Recipient), (id) =>
    Effect.gen(function* () {
      const service = yield* RecipientsService;
      return Option.getOrNull(yield* service.get(id));
    }),
  ),
  update: makeOp(WIRE.recipients.update, RecipientUpdatePayload, Recipient, (payload) =>
    Effect.gen(function* () {
      const service = yield* RecipientsService;
      return yield* service.update(payload);
    }),
  ),
  delete: makeOp(WIRE.recipients.delete, RecipientDeletePayload, RecipientDeleteResponse, (ids) =>
    Effect.gen(function* () {
      const service = yield* RecipientsService;
      return { deleted: yield* service.delete(ids) };
    }),
  ),
  listBatches: makeOp(WIRE.recipients.listBatches, null, Schema.Array(ImportBatch), () =>
    Effect.gen(function* () {
      const service = yield* RecipientsService;
      return yield* service.listBatches();
    }),
  ),
  listAll: makeOp(WIRE.recipients.listAll, RecipientListAllPayload, Schema.Array(Recipient), (filter) =>
    Effect.gen(function* () {
      const service = yield* RecipientsService;
      return yield* service.listAll(filter);
    }),
  ),
};
