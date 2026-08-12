import { Context, Effect, Schema } from "effect";

/**
 * The IPC bridge machinery: how an operation table row becomes a
 * registered handler. Electron-free by design - the service modules that
 * export operation tables import this (and their vitest suites run in
 * plain node), and tests drive the machinery through a fake registry.
 */

/**
 * Decodes a renderer-to-main payload at the boundary. The wire payload is
 * the raw `invoke` argument (bare value for single-argument calls, tuple
 * for multi-argument calls); malformed payloads throw a typed ParseError
 * before any handler logic runs.
 */
export function decodePayload<S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  payload: unknown,
): S["Type"] {
  return Schema.decodeUnknownSync(schema)(payload);
}

/**
 * Where a handler is registered. Electron's `ipcMain.handle` behind the
 * trusted-sender check in production (`electronRegistry` in ipc.ts); a
 * capturing fake in tests. Two adapters make the seam real.
 */
export interface IpcRegistry {
  handle(channel: string, handler: (payload: unknown) => Promise<unknown> | unknown): void;
}

/**
 * One operation: the channel, the payload/response schemas, and the
 * domain call. The machinery owns decode -> run -> encode uniformly, so
 * a row carries only what is specific to its operation.
 *
 * `payload` absent: the raw call is dropped, `run` receives null.
 * `response` absent: the value resolves as-is (void calls).
 */
export interface Operation {
  readonly channel: string;
  readonly payload?: Schema.ConstraintDecoder<unknown>;
  readonly response?: Schema.ConstraintEncoder<unknown>;
  readonly run: (payload: unknown) => unknown;
}

/**
 * Builds one operation row with the payload/response types inferred from
 * the schemas, so table writers keep full type checking on the domain
 * call while the machinery-facing shape stays uniform. Two shapes: an
 * operation with a payload schema decodes before `run` (which receives
 * the decoded value), an operation without one passes null straight
 * through (its `run` takes no arguments).
 */
export function makeOp<P, R>(
  wire: { readonly channel: string },
  payload: Schema.Schema<P>,
  response: Schema.Schema<R> | null,
  run: (payload: P) => Effect.Effect<R, unknown, unknown>,
): Operation;
export function makeOp<R>(
  wire: { readonly channel: string },
  payload: null,
  response: Schema.Schema<R> | null,
  run: () => Effect.Effect<R, unknown, unknown>,
): Operation;
export function makeOp<P, R>(
  wire: { readonly channel: string },
  payload: Schema.Schema<P> | null,
  response: Schema.Schema<R> | null,
  run: (...args: unknown[]) => unknown,
): Operation {
  return {
    channel: wire.channel,
    // The constraint types erase the generic params (DecodingServices of
    // an unconstrained Schema<P> is unknown, not never); concrete schemas
    // satisfy them at every call site, which is what the machinery needs.
    payload: (payload ?? undefined) as unknown as Schema.ConstraintDecoder<unknown> | undefined,
    response: (response ?? undefined) as unknown as Schema.ConstraintEncoder<unknown> | undefined,
    run,
  };
}

/**
 * Turns one operation into a registered handler: decode the payload,
 * run the program against the app context, encode the response. The
 * context is provided per call against the same built instance, exactly
 * as the previous per-handler `run` helper did.
 */
export function makeHandler<R>(
  op: Operation,
  context: Context.Context<R>,
): (payload: unknown) => Promise<unknown> {
  return (payload) => {
    const decoded = op.payload === undefined ? null : decodePayload(op.payload, payload);
    const program = op.run(decoded);
    let promise: Promise<unknown>;
    if (Effect.isEffect(program)) {
      // The guard narrows to Effect<any, any, any>; the actual requirement
      // set is whatever the shared context provides, so type it as such.
      const provided = Effect.provideContext(
        program as unknown as Effect.Effect<unknown, unknown, R>,
        context,
      );
      promise = Effect.runPromise(provided);
    } else {
      promise = Promise.resolve(program);
    }
    return promise.then((value) =>
      op.response === undefined ? value : Schema.encodeSync(op.response)(value),
    );
  };
}

/**
 * Registers every operation of every domain table against the given
 * registry. The composition root (index.ts) calls this once at boot with
 * the Electron registry and the shared app context.
 */
export function registerHandlers<R>(
  registry: IpcRegistry,
  context: Context.Context<R>,
  domains: readonly (Readonly<Record<string, Operation>>)[],
): void {
  for (const domain of domains) {
    for (const op of Object.values(domain)) {
      registry.handle(op.channel, makeHandler(op, context));
    }
  }
}
