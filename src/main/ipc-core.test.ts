import { describe, expect, it } from "vitest";
import { Context, Effect, Schema } from "effect";
import { WIRE } from "../shared/wire";
import {
  makeHandler,
  makeOp,
  registerHandlers,
  type IpcRegistry,
  type Operation,
} from "./ipc-core";
import { systemOperations } from "./ipc";
import { settingsOperations } from "./services/settings";
import { importOperations } from "./services/import";
import { recipientsOperations } from "./services/recipients";
import { templatesOperations } from "./services/templates";
import { fontsOperations } from "./services/fonts";
import { messageTemplatesOperations } from "./services/message-templates";
import { generateOperations } from "./services/generate-jobs";
import { smtpOperations } from "./services/smtp";
import { sendOperations, logsOperations } from "./services/send-jobs";
import { updateOperations } from "./services/update";

/**
 * The same table list the composition root registers. A domain added
 * here keeps the wire/handler consistency guard honest.
 */
const DOMAINS: readonly Readonly<Record<string, Operation>>[] = [
  systemOperations,
  settingsOperations,
  importOperations,
  recipientsOperations,
  templatesOperations,
  fontsOperations,
  messageTemplatesOperations,
  generateOperations,
  smtpOperations,
  sendOperations,
  logsOperations,
  updateOperations,
];

function allHandlers(): Map<string, Operation> {
  const byChannel = new Map<string, Operation>();
  for (const domain of DOMAINS) {
    for (const op of Object.values<Operation>(domain)) {
      if (byChannel.has(op.channel)) {
        throw new Error(`duplicate handler for channel ${op.channel}`);
      }
      byChannel.set(op.channel, op);
    }
  }
  return byChannel;
}

type WireInvokeEntry = { readonly channel: string; readonly args: 0 | 1 | 2 };
type WireEventEntry = { readonly channel: string; readonly event: true };
type WireEntry = WireInvokeEntry | WireEventEntry;

function wireInvokeChannels(): string[] {
  return Object.values(WIRE).flatMap((domain) =>
    Object.values<WireEntry>(domain)
      .filter((entry): entry is WireInvokeEntry => "args" in entry)
      .map((entry) => entry.channel),
  );
}

function wireEventChannels(): string[] {
  return Object.values(WIRE).flatMap((domain) =>
    Object.values<WireEntry>(domain)
      .filter((entry): entry is WireEventEntry => "event" in entry && entry.event)
      .map((entry) => entry.channel),
  );
}

describe("wire/handler consistency", () => {
  it("every wire invoke operation has exactly one handler", () => {
    const handlers = allHandlers();
    const wireChannels = wireInvokeChannels();
    expect(wireChannels.length).toBeGreaterThan(0);
    for (const channel of wireChannels) {
      expect(handlers.has(channel), `missing handler for ${channel}`).toBe(true);
    }
    expect(handlers.size).toBe(wireChannels.length);
  });

  it("every handler channel exists in the wire table", () => {
    const wireChannels = new Set(wireInvokeChannels());
    for (const channel of allHandlers().keys()) {
      expect(wireChannels.has(channel), `handler for unknown channel ${channel}`).toBe(true);
    }
  });

  it("push-event channels have no handlers", () => {
    const handlers = allHandlers();
    for (const channel of wireEventChannels()) {
      expect(handlers.has(channel), `unexpected handler for event channel ${channel}`).toBe(false);
    }
  });
});

describe("makeHandler", () => {
  class Greeter extends Context.Service<
    Greeter,
    { greet: (name: string) => Effect.Effect<string> }
  >()("Greeter") {}

  const context = Context.make(Greeter, { greet: (name) => Effect.succeed(`hello ${name}`) });

  const greet = makeOp({ channel: "test:greet" }, Schema.String, Schema.String, (name) =>
    Effect.gen(function* () {
      const greeter = yield* Greeter;
      return yield* greeter.greet(name);
    }),
  );

  it("decodes the payload, runs the program against the context, encodes the response", async () => {
    await expect(makeHandler(greet, context)("world")).resolves.toBe("hello world");
  });

  it("rejects a malformed payload before the handler runs", () => {
    expect(() => makeHandler(greet, context)(42)).toThrow();
  });

  it("ignores the payload when the operation has no payload schema", async () => {
    const op = makeOp({ channel: "test:no-payload" }, null, Schema.String, () =>
      Effect.succeed("no payload"),
    );
    await expect(makeHandler(op, context)("anything")).resolves.toBe("no payload");
  });

  it("returns the raw value when the operation has no response schema", async () => {
    const op = makeOp({ channel: "test:void" }, null, null, () => Effect.void);
    await expect(makeHandler(op, context)("ignored")).resolves.toBeUndefined();
  });
});

describe("registerHandlers", () => {
  it("registers every operation through the registry seam", () => {
    const registered = new Map<string, (payload: unknown) => unknown>();
    const fakeRegistry: IpcRegistry = {
      handle: (channel, handler) => {
        registered.set(channel, handler);
      },
    };
    const op = makeOp({ channel: "test:reg" }, null, null, () => Effect.void);
    registerHandlers(fakeRegistry, Context.empty(), [{ reg: op }]);
    expect(registered.has("test:reg")).toBe(true);
  });
});
