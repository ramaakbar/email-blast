import { describe, expect, it, vi } from "vitest";
import {
  CIPHERTEXT_PREFIX,
  isCiphertext,
  makeCredentialCrypto,
  type SafeStorageLike,
} from "./credential-crypto";

/**
 * The credential crypto seam (ticket 02): store/read round trips through
 * the OS-keychain-backed safeStorage surface, legacy plaintext passes
 * through untouched, and every unavailable/unreadable path degrades to
 * the plaintext / an unset value with a one-time log instead of throwing.
 */

/** A reversible fake keychain, keyed by a marker so ciphertext is distinguishable. */
function fakeSafeStorage(options: {
  available?: boolean;
  encryptThrows?: boolean;
} = {}): SafeStorageLike & {
  /** The bytes last "encrypted" by the fake, for cross-checking. */
  encryptString: (plaintext: string) => Buffer;
  decryptString: (ciphertext: Buffer) => string;
} {
  const { available = true, encryptThrows = false } = options;
  return {
    isEncryptionAvailable: () => available,
    encryptString: (plaintext) => {
      if (encryptThrows) throw new Error("keychain locked");
      return Buffer.from(`cipher<${plaintext}>`, "utf8");
    },
    decryptString: (ciphertext) => {
      const text = ciphertext.toString("utf8");
      if (!text.startsWith("cipher<")) throw new Error("wrong key");
      return text.slice(7, -1);
    },
  };
}

describe("credential crypto", () => {
  it("round-trips a password through the keychain with the ciphertext marker", () => {
    const crypto = makeCredentialCrypto(fakeSafeStorage(), () => {});
    const stored = crypto.store("hunter2");
    expect(stored).toBe(`${CIPHERTEXT_PREFIX}Y2lwaGVyPGh1bnRlcjI+`);
    expect(stored).not.toBe("hunter2");
    expect(isCiphertext(stored)).toBe(true);
    expect(crypto.read(stored)).toBe("hunter2");
  });

  it("passes legacy plaintext through unchanged", () => {
    const crypto = makeCredentialCrypto(fakeSafeStorage(), () => {});
    expect(isCiphertext("hunter2")).toBe(false);
    expect(crypto.read("hunter2")).toBe("hunter2");
    expect(crypto.read("")).toBe("");
  });

  it("stores plaintext and reads prefixed values as unset when the keychain is unavailable", () => {
    const log = vi.fn();
    const crypto = makeCredentialCrypto(fakeSafeStorage({ available: false }), log);
    expect(crypto.available()).toBe(false);
    expect(crypto.store("hunter2")).toBe("hunter2");
    // A value that was encrypted elsewhere (e.g. the database moved
    // machines) must not be handed to SMTP as-is.
    expect(crypto.read(`${CIPHERTEXT_PREFIX}abc`)).toBe("");
    expect(log).toHaveBeenCalledTimes(1);
  });

  it("reads as unset and logs when the ciphertext cannot be decrypted (wrong key)", () => {
    const log = vi.fn();
    const crypto = makeCredentialCrypto(fakeSafeStorage(), log);
    const stored = `${CIPHERTEXT_PREFIX}${Buffer.from("not-from-this-keychain").toString("base64")}`;
    expect(crypto.read(stored)).toBe("");
    expect(log).toHaveBeenCalledTimes(1);
  });

  it("degrades to plaintext when encryptString throws despite encryption being available", () => {
    const log = vi.fn();
    const crypto = makeCredentialCrypto(fakeSafeStorage({ encryptThrows: true }), log);
    expect(crypto.store("hunter2")).toBe("hunter2");
    expect(log).toHaveBeenCalledWith(expect.stringContaining("keychain encryption failed"));
  });

  it("logs repeated failures only once per boot", () => {
    const log = vi.fn();
    const crypto = makeCredentialCrypto(fakeSafeStorage(), log);
    const stored = `${CIPHERTEXT_PREFIX}${Buffer.from("not-from-this-keychain").toString("base64")}`;
    for (let i = 0; i < 3; i++) crypto.read(stored);
    expect(log).toHaveBeenCalledTimes(1);
  });

  it("reports availability through the safeStorage surface", () => {
    expect(makeCredentialCrypto(null, () => {}).available()).toBe(false);
    expect(makeCredentialCrypto(fakeSafeStorage(), () => {}).available()).toBe(true);
  });
});
