/**
 * The credential-at-rest crypto seam (ticket 02, spec decision "Password
 * encryption at rest"): SMTP passwords - profile passwords and the inline
 * overrides stored with past Send Jobs - are encrypted in the database
 * with the OS keychain via Electron safeStorage.
 *
 * The interface keeps Electron out of the repository and the services:
 * `makeCredentialCrypto` takes the safeStorage surface structurally, so
 * unit tests pass a fake and the boot path (index.ts) passes the real
 * one. Electron itself is only imported where the app boots.
 *
 * Storage format: `enc:v1:<base64>` where the base64 is the output of
 * `safeStorage.encryptString(plaintext)`. Anything without the prefix is
 * treated as legacy plaintext and passes through unchanged - the boot
 * migration (migrateCredentialsAtRest in db/repository.ts) converts those
 * values in place once. A stored value that carries the prefix but cannot
 * be decrypted (keychain cleared, database moved to another machine) logs
 * and reads as "no recoverable password" - never the ciphertext bytes, so
 * the SMTP server never sees garbage as the password.
 */

/** The marker prefix of a stored ciphertext value; its absence means legacy plaintext. */
export const CIPHERTEXT_PREFIX = "enc:v1:";

/**
 * The safeStorage surface the crypto needs, structurally typed so the
 * seam works without importing electron (tests pass a fake).
 */
export interface SafeStorageLike {
  readonly isEncryptionAvailable: () => boolean;
  readonly encryptString: (plaintext: string) => Buffer;
  readonly decryptString: (ciphertext: Buffer) => string;
}

export interface CredentialCrypto {
  /** true when the OS keychain is usable right now (the boot logs once when not). */
  readonly available: () => boolean;
  /**
   * Encrypts a plaintext password for storage, falling back to the
   * plaintext itself when the keychain is unavailable or the encryption
   * fails - the graceful-degradation policy, so the caller never has to
   * remember the fallback.
   */
  readonly store: (plaintext: string) => string;
  /**
   * Decrypts a stored password. Legacy plaintext passes through; a
   * ciphertext value that cannot be decrypted (keychain unavailable or
   * the wrong key) logs and reads as "" - the caller treats that as an
   * unset password.
   */
  readonly read: (stored: string) => string;
}

/** true when the stored value carries the ciphertext marker (not legacy plaintext). */
export function isCiphertext(value: string): boolean {
  return value.startsWith(CIPHERTEXT_PREFIX);
}

export function makeCredentialCrypto(
  safeStorage: SafeStorageLike | null,
  log: (message: string) => void,
): CredentialCrypto {
  const available = (): boolean => safeStorage !== null && safeStorage.isEncryptionAvailable();
  // A broken keychain (locked, cleared, re-keyed) would otherwise log on
  // every read of every stored credential - one clear warning per boot is
  // enough, the per-value failures keep the same null result.
  let warnedAboutFailures = false;
  const warn = (message: string): void => {
    if (warnedAboutFailures) return;
    warnedAboutFailures = true;
    log(message);
  };
  return {
    available,
    store: (plaintext) => {
      if (!available()) return plaintext;
      try {
        return (
          CIPHERTEXT_PREFIX +
          (safeStorage as SafeStorageLike).encryptString(plaintext).toString("base64")
        );
      } catch (error) {
        // isEncryptionAvailable() can report true and encryptString still
        // throw (locked keyring, keychain access denied) - degrade to
        // plaintext storage with a log, never crash the boot.
        warn(
          `[credentials] keychain encryption failed (${
            error instanceof Error ? error.message : String(error)
          }) - storing the password in plaintext`,
        );
        return plaintext;
      }
    },
    read: (stored) => {
      if (!isCiphertext(stored)) return stored;
      if (!available()) {
        warn("[credentials] safeStorage unavailable - cannot decrypt stored passwords");
        return "";
      }
      try {
        return (safeStorage as SafeStorageLike).decryptString(
          Buffer.from(stored.slice(CIPHERTEXT_PREFIX.length), "base64"),
        );
      } catch (error) {
        warn(
          `[credentials] failed to decrypt a stored password (${
            error instanceof Error ? error.message : String(error)
          }) - treating it as unset`,
        );
        return "";
      }
    },
  };
}
