import { describe, expect, it } from "vitest";
import { validateRecipientEdit } from "./recipient-edit";

describe("validateRecipientEdit (Seam: pure)", () => {
  it("accepts a valid edit: name present, email with @, phone irrelevant", () => {
    expect(validateRecipientEdit("Budi Santoso", "budi@example.com")).toBeNull();
    expect(validateRecipientEdit("  Budi  ", " b@e.id ")).toBeNull();
  });

  it("accepts a null email (the recipient may have none - import is permissive)", () => {
    expect(validateRecipientEdit("Budi", null)).toBeNull();
  });

  it("rejects an empty or whitespace-only name", () => {
    expect(validateRecipientEdit("", "budi@example.com")).toMatch(/required/i);
    expect(validateRecipientEdit("   ", "budi@example.com")).toMatch(/required/i);
  });

  it("rejects an email without @ (the edit-only light check)", () => {
    expect(validateRecipientEdit("Budi", "budi.example.com")).toMatch(/@/);
    expect(validateRecipientEdit("Budi", "  ")).toMatch(/@/);
  });

  it("does not require @ on a null email", () => {
    expect(validateRecipientEdit("Budi", null)).toBeNull();
  });
});
