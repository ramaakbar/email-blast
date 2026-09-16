import { describe, expect, it } from "vitest";
import type { SlotSource } from "./generate";
import {
  distinctTemplateValues,
  recipientTemplateValue,
  resolveTemplateId,
  routedRecipients,
  suggestTemplateColumn,
  unassignedTemplateValues,
  validateJobOutputPattern,
} from "./template-assignment";

/**
 * The pure Template Assignment logic (ticket 08, ADR 0006): column
 * suggestion, value resolution, the unassigned fail-fast report, and the
 * job output-pattern validation. Expected values here are known-good
 * literals, independent of the implementation.
 */

const RECIPIENTS: SlotSource[] = [
  {
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: null,
    metadata: { template: "LOA", instansi: "Yayasan X" },
  },
  {
    name: "Sari Putri",
    email: "sari@example.com",
    phone: null,
    metadata: { template: "SK", instansi: "Sekolah Y" },
  },
  {
    name: "Andi Wijaya",
    email: "andi@example.com",
    phone: null,
    metadata: { template: "" },
  },
  {
    name: "Dewi Lestari",
    email: "dewi@example.com",
    phone: null,
    metadata: {}, // no template column at all - routes to the default
  },
];

describe("suggestTemplateColumn", () => {
  it("picks an exact synonym header, case-insensitively", () => {
    expect(suggestTemplateColumn(["Nama", "Email", "Jenis", "Instansi"])).toBe("Jenis");
    expect(suggestTemplateColumn(["Name", "Email", "Template"])).toBe("Template");
    expect(suggestTemplateColumn(["name", "email", "kategori"])).toBe("kategori");
    expect(suggestTemplateColumn(["name", "email", "TIPE"])).toBe("TIPE");
  });

  it("falls back to a distinctive substring when no exact synonym matched", () => {
    expect(suggestTemplateColumn(["Name", "Email", "Jenis Dokumen"])).toBe("Jenis Dokumen");
    expect(suggestTemplateColumn(["Name", "Template Dokumen"])).toBe("Template Dokumen");
  });

  it("returns null when no column looks like a routing column", () => {
    expect(suggestTemplateColumn(["Name", "Email", "Instansi", "Keterangan"])).toBeNull();
    expect(suggestTemplateColumn([])).toBeNull();
  });

  it("prefers exact synonyms over substring matches", () => {
    // "Kategori" matches both exactly and as a substring of the first
    // column - the exact match wins regardless of sheet order.
    expect(suggestTemplateColumn(["Kategori Kegiatan", "Kategori"])).toBe("Kategori");
  });
});

describe("recipientTemplateValue", () => {
  it("reads the trimmed metadata value for the column", () => {
    expect(recipientTemplateValue(RECIPIENTS[0], "template")).toBe("LOA");
  });

  it("returns null for a blank or missing value", () => {
    expect(recipientTemplateValue(RECIPIENTS[2], "template")).toBeNull();
    expect(recipientTemplateValue(RECIPIENTS[3], "template")).toBeNull();
  });
});

describe("distinctTemplateValues", () => {
  it("lists distinct non-blank values in first-seen order", () => {
    expect(distinctTemplateValues(RECIPIENTS, "template")).toEqual(["LOA", "SK"]);
  });

  it("is empty when every value is blank or the column is absent", () => {
    expect(distinctTemplateValues([RECIPIENTS[2], RECIPIENTS[3]], "template")).toEqual([]);
    expect(distinctTemplateValues([], "template")).toEqual([]);
  });
});

describe("resolveTemplateId", () => {
  const assignment = { LOA: "tpl-loa", SK: "tpl-sk" };

  it("routes blank values to the default template", () => {
    expect(resolveTemplateId(null, "tpl-default", assignment)).toBe("tpl-default");
    expect(resolveTemplateId("", "tpl-default", assignment)).toBe("tpl-default");
    expect(resolveTemplateId(undefined, "tpl-default", assignment)).toBe("tpl-default");
  });

  it("routes a mapped value to its assigned template", () => {
    expect(resolveTemplateId("LOA", "tpl-default", assignment)).toBe("tpl-loa");
    expect(resolveTemplateId(" SK ", "tpl-default", assignment)).toBe("tpl-sk");
  });

  it("returns null for an unmapped value - the fail-fast case", () => {
    expect(resolveTemplateId("PIAGAM", "tpl-default", assignment)).toBeNull();
  });

  it("treats an empty-string assignment target as unmapped (cleared assignment)", () => {
    // The UI's "Choose a template" placeholder writes "" when the user
    // clears an assignment; the value must re-enter the fail-fast report.
    expect(resolveTemplateId("LOA", "tpl-default", { LOA: "" })).toBeNull();
    expect(unassignedTemplateValues(RECIPIENTS, "template", "tpl-default", { LOA: "" })).toEqual([
      { value: "LOA", count: 1, recipientNames: ["Budi Santoso"] },
      { value: "SK", count: 1, recipientNames: ["Sari Putri"] },
    ]);
  });
});

describe("routedRecipients", () => {
  const assignment = { LOA: "tpl-loa", SK: "tpl-sk" };

  it("splits recipients across their assigned templates", () => {
    expect(
      routedRecipients(RECIPIENTS, "template", "tpl-loa", "tpl-default", assignment).map(
        (r) => r.name,
      ),
    ).toEqual(["Budi Santoso"]);
    expect(
      routedRecipients(RECIPIENTS, "template", "tpl-sk", "tpl-default", assignment).map(
        (r) => r.name,
      ),
    ).toEqual(["Sari Putri"]);
  });

  it("routes blank and missing values to the default template", () => {
    expect(
      routedRecipients(RECIPIENTS, "template", "tpl-default", "tpl-default", assignment).map(
        (r) => r.name,
      ),
    ).toEqual(["Andi Wijaya", "Dewi Lestari"]);
  });

  it("routes nobody to an unmapped template", () => {
    expect(
      routedRecipients(RECIPIENTS, "template", "tpl-other", "tpl-default", assignment),
    ).toEqual([]);
  });
});

describe("unassignedTemplateValues", () => {
  it("reports unmapped values with the affected recipients by name", () => {
    const entries = unassignedTemplateValues(RECIPIENTS, "template", "tpl-default", {
      LOA: "tpl-loa",
    });
    expect(entries).toEqual([
      {
        value: "SK",
        count: 1,
        recipientNames: ["Sari Putri"],
      },
    ]);
  });

  it("is empty when every value is assigned", () => {
    expect(
      unassignedTemplateValues(RECIPIENTS, "template", "tpl-default", {
        LOA: "tpl-loa",
        SK: "tpl-sk",
      }),
    ).toEqual([]);
  });

  it("is empty when no column is declared (blank values all route to the default)", () => {
    expect(
      unassignedTemplateValues([RECIPIENTS[2], RECIPIENTS[3]], "template", "tpl-default", {}),
    ).toEqual([]);
  });
});

describe("validateJobOutputPattern", () => {
  const TEMPLATES = [
    { id: "tpl-loa", name: "LOA", slots: ["name", "instansi"] },
    { id: "tpl-sk", name: "SK", slots: ["name"] },
  ];

  it("accepts a pattern whose slots every involved template declares", () => {
    expect(validateJobOutputPattern("BATCH_{name}.pdf", TEMPLATES)).toBeNull();
  });

  it("rejects a pattern without any slot reference", () => {
    expect(validateJobOutputPattern("certificate.pdf", TEMPLATES)).not.toBeNull();
  });

  it("rejects a slot that one involved template does not declare", () => {
    const error = validateJobOutputPattern("BATCH_{name}_{instansi}.pdf", TEMPLATES);
    expect(error).not.toBeNull();
    expect(error).toContain("{instansi}");
    expect(error).toContain("SK");
  });
});
