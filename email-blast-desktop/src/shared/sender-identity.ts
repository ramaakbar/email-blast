/**
 * The sender-identity warning heuristic (spec decision "SMTP Profile Sender
 * Identity", ticket 01): a soft, advisory-only signal that the per-job From
 * address is one the provider is likely to reject.
 *
 * Two independent rules, in priority order:
 * - Known providers (hostname maps to a provider domain, e.g. smtp.gmail.com
 *   -> gmail.com): warn when the From address's domain does not match the
 *   authenticated account's domain (the username's own domain, so a Gmail
 *   Workspace account with a custom domain still compares correctly).
 * - Any other provider: warn only when a profile is selected and the From
 *   address differs from the profile's default identity address.
 *
 * The result is machine-readable so the renderer maps it to localized copy;
 * the heuristic itself never blocks a send - it is a nudge, nothing more.
 * An unparseable or empty From address warns nothing: there is nothing to
 * compare against.
 */
export type SenderIdentityWarning =
  | {
      readonly kind: "provider-domain-mismatch";
      /** The provider the host belongs to (e.g. "Gmail"), for copy. */
      readonly provider: string;
      readonly accountDomain: string;
      readonly fromDomain: string;
    }
  | {
      readonly kind: "differs-from-profile-default";
      /** The profile's default identity address the From was compared against. */
      readonly profileAddress: string;
    };

/**
 * An identity field (sender name, address, reply-to) as stored: blank
 * input becomes null - "not set". The profile form, the send step, and
 * the main process all persist through this one rule, so a blank field
 * can never round-trip into an empty-string identity.
 */
export function normalizeIdentity(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed === "" ? null : trimmed;
}

/** The known SMTP hosts whose provider constrains the From domain. */
const KNOWN_PROVIDERS: Readonly<Record<string, { name: string; domain: string }>> = {
  "smtp.gmail.com": { name: "Gmail", domain: "gmail.com" },
  "smtp.googlemail.com": { name: "Gmail", domain: "gmail.com" },
  "smtp.mail.yahoo.com": { name: "Yahoo", domain: "yahoo.com" },
  "smtp-mail.outlook.com": { name: "Outlook", domain: "outlook.com" },
  "smtp.office365.com": { name: "Microsoft 365", domain: "outlook.com" },
};

/** The host as configured, minus a trailing ":port" if one crept in. */
function bareHost(host: string): string {
  return host.trim().toLowerCase().replace(/:\d+$/, "");
}

/** The domain of an email address, lowercased; null when unparseable. */
function addressDomain(address: string): string | null {
  const at = address.trim().lastIndexOf("@");
  if (at <= 0 || at === address.trim().length - 1) return null;
  const domain = address.trim().slice(at + 1);
  return domain === "" ? null : domain.toLowerCase();
}

export function senderIdentityWarning(input: {
  /** The SMTP host of the connection (profile host or inline host). */
  readonly host: string;
  /** The authenticated account (the SMTP username). */
  readonly username: string;
  /** The per-job From address the send will deliver with. */
  readonly senderAddress: string;
  /** The selected profile's default identity address, or null (no profile / none set). */
  readonly profileSenderAddress: string | null;
}): SenderIdentityWarning | null {
  const fromDomain = addressDomain(input.senderAddress);
  if (fromDomain === null) return null;

  const provider = KNOWN_PROVIDERS[bareHost(input.host)];
  if (provider !== undefined) {
    const accountDomain = addressDomain(input.username);
    if (accountDomain === null) return null;
    if (fromDomain !== accountDomain) {
      return {
        kind: "provider-domain-mismatch",
        provider: provider.name,
        accountDomain,
        fromDomain,
      };
    }
    return null;
  }

  // Unknown provider: only a selected profile's set default identity
  // anchors the comparison - no profile means nothing was overridden.
  const profileAddress = input.profileSenderAddress?.trim() ?? "";
  if (profileAddress === "") return null;
  return input.senderAddress.trim().toLowerCase() === profileAddress.toLowerCase()
    ? null
    : { kind: "differs-from-profile-default", profileAddress };
}
