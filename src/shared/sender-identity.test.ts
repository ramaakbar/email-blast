import { describe, expect, it } from "vitest";
import { senderIdentityWarning } from "./sender-identity";

/**
 * Seam A for the sender-identity warning heuristic (ticket 01): pure
 * logic the renderer runs before every send, so the nudge the Send
 * workspace shows and the rejection the provider would give can never
 * drift apart. The heuristic is advisory - it never gates a send - so
 * the tests pin what it says, not what it blocks.
 */

describe("senderIdentityWarning - known providers", () => {
  it("stays quiet when the From domain matches the account domain", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com",
        username: "akbar@gmail.com",
        senderAddress: "yayasan@gmail.com",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });

  it("warns when the From domain is a different domain on a known provider", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com",
        username: "akbar@gmail.com",
        senderAddress: "yayasan@example.org",
        profileSenderAddress: null,
      }),
    ).toEqual({
      kind: "provider-domain-mismatch",
      provider: "Gmail",
      accountDomain: "gmail.com",
      fromDomain: "example.org",
    });
  });

  it("compares case-insensitively on both domains", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com",
        username: "Akbar@Gmail.com",
        senderAddress: "yayasan@gmail.com",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });

  it("uses the account domain, so a Workspace custom domain compares correctly", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com",
        username: "akbar@yayasan.example",
        senderAddress: "yayasan@yayasan.example",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });

  it("warns for Yahoo and Outlook hosts the same way", () => {
    const yahoo = senderIdentityWarning({
      host: "smtp.mail.yahoo.com",
      username: "akbar@yahoo.com",
      senderAddress: "akbar@example.org",
      profileSenderAddress: null,
    });
    expect(yahoo).not.toBeNull();
    expect(yahoo).toMatchObject({ kind: "provider-domain-mismatch", provider: "Yahoo" });
  });

  it("recognizes the provider host even when a port crept into the field", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com:465",
        username: "akbar@gmail.com",
        senderAddress: "yayasan@example.org",
        profileSenderAddress: null,
      }),
    ).toMatchObject({ kind: "provider-domain-mismatch", provider: "Gmail" });
  });
});

describe("senderIdentityWarning - unknown providers", () => {
  it("warns when the From differs from the selected profile's default identity", () => {
    expect(
      senderIdentityWarning({
        host: "127.0.0.1",
        username: "me",
        senderAddress: "overridden@example.org",
        profileSenderAddress: "iym@example.org",
      }),
    ).toEqual({
      kind: "differs-from-profile-default",
      profileAddress: "iym@example.org",
    });
  });

  it("stays quiet when the From matches the profile default", () => {
    expect(
      senderIdentityWarning({
        host: "127.0.0.1",
        username: "me",
        senderAddress: "iym@example.org",
        profileSenderAddress: "iym@example.org",
      }),
    ).toBeNull();
  });

  it("stays quiet when the From differs but the profile has no default identity", () => {
    expect(
      senderIdentityWarning({
        host: "127.0.0.1",
        username: "me",
        senderAddress: "overridden@example.org",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });

  it("stays quiet with no profile at all (inline entry)", () => {
    expect(
      senderIdentityWarning({
        host: "127.0.0.1",
        username: "me",
        senderAddress: "anything@example.org",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });

  it("compares the profile default case-insensitively", () => {
    expect(
      senderIdentityWarning({
        host: "127.0.0.1",
        username: "me",
        senderAddress: "Iym@Example.org",
        profileSenderAddress: "iym@example.org",
      }),
    ).toBeNull();
  });
});

describe("senderIdentityWarning - unparseable input", () => {
  it("stays quiet for an empty From address", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com",
        username: "akbar@gmail.com",
        senderAddress: "",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });

  it("stays quiet for an address without a domain", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com",
        username: "akbar@gmail.com",
        senderAddress: "not-an-address",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });

  it("stays quiet when the account has no domain to compare against", () => {
    expect(
      senderIdentityWarning({
        host: "smtp.gmail.com",
        username: "me",
        senderAddress: "yayasan@example.org",
        profileSenderAddress: null,
      }),
    ).toBeNull();
  });
});
