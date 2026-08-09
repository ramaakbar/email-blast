import { Context, Data, Effect, Layer, Option } from "effect";
import Database from "better-sqlite3";
import type { MessageTemplate } from "../../shared/ipc";
import { validateMessageTemplate } from "../../shared/send";
import {
  SqliteRepo,
  type MessageTemplateDraft,
  type MessageTemplatePatch,
  type SqliteRepoShape,
} from "../db/repository";
import type { CredentialCrypto } from "./credential-crypto";

/**
 * The Message Templates domain (ticket 03, ADR 0005): reusable subjects
 * and HTML bodies with `{slot}` placeholders, managed under the Messages
 * tab of the Templates screen. Copy-on-pick semantics are the contract,
 * not a column: a Send Job picks a template's contents into its own
 * subject/body columns and never references this table, so editing a
 * template here can never change a job that already picked it - and
 * "Save as template" from a job message is exactly the create below.
 * Validation only checks the name, subject, and body are non-empty:
 * `{slot}` references are recipient-dependent, so they are checked per
 * recipient at send time (shared/send.ts), not at save time.
 */

/** A template payload that fails validation (empty name, subject, or body). */
export class InvalidMessageTemplate extends Data.TaggedError("InvalidMessageTemplate")<{
  readonly message: string;
}> {}

/**
 * Updating a Message Template whose id no longer exists (deleted in
 * another window, or gone since the list was fetched).
 */
export class MessageTemplateUpdateNotFound extends Data.TaggedError(
  "MessageTemplateUpdateNotFound",
)<{}> {}

export interface MessageTemplatesServiceShape {
  /** Every Message Template, most recently edited first. */
  readonly list: () => Effect.Effect<MessageTemplate[]>;
  /** A single Message Template by id, or none when no such id exists. */
  readonly get: (id: string) => Effect.Effect<Option.Option<MessageTemplate>>;
  /** Saves a Message Template; validates the name, subject, and body. */
  readonly create: (draft: MessageTemplateDraft) => Effect.Effect<
    MessageTemplate,
    InvalidMessageTemplate
  >;
  /** Edits the mutable fields of a Message Template. */
  readonly update: (
    id: string,
    patch: MessageTemplatePatch,
  ) => Effect.Effect<MessageTemplate, InvalidMessageTemplate | MessageTemplateUpdateNotFound>;
  /** Deletes a Message Template and returns how many rows were removed. */
  readonly delete: (id: string) => Effect.Effect<number>;
}

export function makeMessageTemplatesService(
  repo: SqliteRepoShape,
): MessageTemplatesServiceShape {
  return {
    list: () => repo.listMessageTemplates(),
    get: (id) => repo.getMessageTemplate(id),
    create: (draft) =>
      Effect.gen(function* () {
        const error = validateMessageTemplate(draft.name, draft.subject, draft.bodyHtml);
        if (error !== null) return yield* Effect.fail(new InvalidMessageTemplate({ message: error }));
        // Only the name is trimmed: the subject and body carry the user's
        // whitespace and markup verbatim, exactly as a typed job message does.
        return yield* repo.insertMessageTemplate({
          name: draft.name.trim(),
          subject: draft.subject,
          bodyHtml: draft.bodyHtml,
        });
      }),
    update: (id, patch) =>
      Effect.gen(function* () {
        const error = validateMessageTemplate(patch.name, patch.subject, patch.bodyHtml);
        if (error !== null) return yield* Effect.fail(new InvalidMessageTemplate({ message: error }));
        const updated = yield* repo.updateMessageTemplate(id, {
          name: patch.name.trim(),
          subject: patch.subject,
          bodyHtml: patch.bodyHtml,
        });
        if (Option.isNone(updated)) return yield* Effect.fail(new MessageTemplateUpdateNotFound());
        return updated.value;
      }),
    delete: (id) => repo.deleteMessageTemplate(id),
  };
}

/**
 * The Message Templates domain service. Constructing this layer provides
 * SqliteRepo alongside, so a program can depend on either.
 */
export class MessageTemplatesService extends Context.Service<
  MessageTemplatesService,
  MessageTemplatesServiceShape
>()("MessageTemplatesService") {
  static readonly Live = (
    db: Database.Database,
    credCrypto: CredentialCrypto,
  ): Layer.Layer<MessageTemplatesService | SqliteRepo> =>
    Layer.provideMerge(
      Layer.effect(
        MessageTemplatesService,
        Effect.gen(function* () {
          const repo = yield* SqliteRepo;
          return makeMessageTemplatesService(repo);
        }),
      ),
      SqliteRepo.Live(db, credCrypto),
    );
}
