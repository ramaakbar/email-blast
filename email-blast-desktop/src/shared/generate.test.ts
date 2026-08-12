import { describe, expect, it } from "vitest";
import {
  fillOutputName,
  resolveSlotValue,
  sanitizeFileNameSegment,
  slotCoverage,
} from "./generate";

/**
 * The pure slot-resolution, coverage, and output-naming logic shared by the
 * main-process generate pipeline and the Generate workspace (ticket 13).
 * Expected values here are known-good literals, independent of the
 * implementation.
 */

const RECIPIENT = {
  id: "r1",
  name: "Budi Santoso",
  email: "budi@example.com",
  phone: "0812-3456-7890",
  metadata: { instansi: "SMK Negeri 1", no: "001" },
  importBatch: "b1",
  createdAt: "2026-08-03 00:00:00",
};

describe("resolveSlotValue", () => {
  it("reads name, email, and phone from the address fields", () => {
    expect(resolveSlotValue(RECIPIENT, "name")).toBe("Budi Santoso");
    expect(resolveSlotValue(RECIPIENT, "email")).toBe("budi@example.com");
    expect(resolveSlotValue(RECIPIENT, "phone")).toBe("0812-3456-7890");
  });

  it("falls back to the metadata bag for every other slot", () => {
    expect(resolveSlotValue(RECIPIENT, "instansi")).toBe("SMK Negeri 1");
    expect(resolveSlotValue(RECIPIENT, "no")).toBe("001");
  });

  it("returns null for a slot with no value anywhere", () => {
    expect(resolveSlotValue(RECIPIENT, "tanggal")).toBeNull();
  });

  it("never lets the metadata bag shadow the address fields", () => {
    const withNameInBag = { ...RECIPIENT, metadata: { ...RECIPIENT.metadata, name: "Hidden" } };
    expect(resolveSlotValue(withNameInBag, "name")).toBe("Budi Santoso");
  });
});

describe("slotCoverage", () => {
  it("reports ok with no gaps when every recipient covers every slot", () => {
    const report = slotCoverage([RECIPIENT], ["name", "instansi", "no"]);
    expect(report.ok).toBe(true);
    expect(report.recipientsMissing).toBe(0);
    expect(report.slots).toEqual([]);
  });

  it("counts which recipients miss which slots", () => {
    const withoutInstansi = { ...RECIPIENT, id: "r2", metadata: { no: "001" } };
    const report = slotCoverage([RECIPIENT, withoutInstansi], ["name", "instansi", "no"]);
    expect(report.ok).toBe(false);
    expect(report.recipientsMissing).toBe(1);
    expect(report.slots).toEqual([{ slot: "instansi", missingCount: 1, recipients: ["r2"] }]);
  });

  it("aggregates the same missing slot across several recipients", () => {
    const a = { ...RECIPIENT, id: "r1", metadata: {} };
    const b = { ...RECIPIENT, id: "r2", metadata: {} };
    const report = slotCoverage([a, b], ["name", "instansi"]);
    expect(report.ok).toBe(false);
    expect(report.recipientsMissing).toBe(2);
    expect(report.slots).toEqual([{ slot: "instansi", missingCount: 2, recipients: ["r1", "r2"] }]);
  });

  it("is ok for an empty recipient list", () => {
    expect(slotCoverage([], ["name"]).ok).toBe(true);
  });

  it("keeps the declared slot order in the report", () => {
    const report = slotCoverage([{ ...RECIPIENT, metadata: {} }], ["instansi", "no"]);
    expect(report.slots.map((entry) => entry.slot)).toEqual(["instansi", "no"]);
  });
});

describe("sanitizeFileNameSegment", () => {
  it("lowercases, trims, and collapses whitespace to underscores", () => {
    expect(sanitizeFileNameSegment("  Budi Santoso  ")).toBe("budi_santoso");
  });

  it("strips diacritics and punctuation", () => {
    expect(sanitizeFileNameSegment("Sarië A. Putri, M.Sc.")).toBe("sarie_a._putri_m.sc.");
    expect(sanitizeFileNameSegment("Muhammad-'Ali")).toBe("muhammad-ali");
  });

  it("strips characters outside letters, digits, whitespace, dots, and dashes", () => {
    expect(sanitizeFileNameSegment("LOA-2026/001")).toBe("loa-2026001");
  });
});

describe("fillOutputName", () => {
  it("replaces every {slot} with its sanitized value", () => {
    expect(fillOutputName("LOA_{no}_{name}.pdf", { no: "001", name: "Budi Santoso" })).toBe(
      "LOA_001_budi_santoso.pdf",
    );
  });

  it("throws when a referenced slot has no value", () => {
    expect(() => fillOutputName("LOA_{name}.pdf", {})).toThrow();
  });
});
