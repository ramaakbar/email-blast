import { describe, expect, it } from "vitest";
import {
  availableSlots,
  escapeHtml,
  extractMessageSlots,
  interpolateMessage,
  interpolateMessagePlain,
  messageCoverage,
  messageValues,
} from "./send";

/**
 * Seam A for the send-domain pure logic (ticket 15): slot interpolation in
 * subject and HTML body, the slot inventory of a message, and the
 * unknown/missing coverage report the message editor previews. Zero
 * dependencies - the renderer runs the same functions as the main
 * process, so the preview the workspace shows and the interpolation the
 * pipeline enforces can never drift apart.
 */

const BUDI = {
  name: "Budi Santoso",
  email: "budi@example.com",
  phone: null,
  metadata: { no: "001", instansi: "SMK Negeri 1" },
};
const SARI = {
  name: "Sari Putri",
  email: "sari@example.com",
  phone: "0812-3456",
  metadata: { no: "002" },
};

describe("messageValues", () => {
  it("maps the address fields and every metadata key to a resolvable slot", () => {
    expect(messageValues(BUDI)).toEqual({
      name: "Budi Santoso",
      email: "budi@example.com",
      no: "001",
      instansi: "SMK Negeri 1",
    });
  });

  it("keeps null address fields out and skips blank metadata values", () => {
    expect(messageValues({ ...BUDI, phone: null, metadata: { kosong: " " } })).toEqual({
      name: "Budi Santoso",
      email: "budi@example.com",
    });
  });
});

describe("extractMessageSlots", () => {
  it("lists the {slot} references of a message, unique and in order", () => {
    expect(extractMessageSlots("Dear {name}, no {no} for {name}")).toEqual(["name", "no"]);
  });

  it("returns an empty list for a message without placeholders", () => {
    expect(extractMessageSlots("No placeholders here")).toEqual([]);
  });
});

describe("interpolateMessage (HTML body, escaped)", () => {
  it("replaces every slot and escapes the HTML-significant characters of values", () => {
    const html = "<p>Dear {name}, your number is {no}.</p>";
    expect(interpolateMessage(html, { name: "Budi <Santoso>", no: "001 & 002" })).toBe(
      "<p>Dear Budi &lt;Santoso&gt;, your number is 001 &amp; 002.</p>",
    );
  });

  it("escapes quotes as well, so attribute contexts cannot break out", () => {
    expect(interpolateMessage("{name}", { name: `A "quoted" value` })).toBe(
      "A &quot;quoted&quot; value",
    );
  });

  it("throws a descriptive error for a missing slot - never a silent literal", () => {
    expect(() => interpolateMessage("Dear {name}", {})).toThrow(/no value for this recipient/);
  });

  it("throws when the values map misses a slot even though another slot fills", () => {
    expect(() => interpolateMessage("{name} {instansi}", { name: "Budi" })).toThrow(/instansi/);
  });
});

describe("interpolateMessagePlain (subject, raw)", () => {
  it("replaces slots without escaping - subjects are plain text", () => {
    expect(interpolateMessagePlain("LOA for {name} & friends", { name: "Budi" })).toBe(
      "LOA for Budi & friends",
    );
  });

  it("throws a descriptive error for a missing slot", () => {
    expect(() => interpolateMessagePlain("Dear {name}", {})).toThrow(/no value for this recipient/);
  });
});

describe("availableSlots", () => {
  it("is the union of every resolvable slot across the selection, stable order", () => {
    expect(availableSlots([BUDI, SARI])).toEqual(["name", "email", "phone", "no", "instansi"]);
  });
});

describe("messageCoverage", () => {
  it("reports unknown slots - referenced by the message, absent from every recipient", () => {
    const report = messageCoverage([BUDI, SARI], "Dear {name}, {instansi}, {keterangan}");
    expect(report.ok).toBe(false);
    expect(report.unknownSlots).toEqual(["keterangan"]);
    // instansi is fillable by Budi but not Sari - that is a missing, not unknown.
    expect(report.missing).toEqual([{ slot: "instansi", missingCount: 1 }]);
  });

  it("reports slots present somewhere but missing for some recipients", () => {
    // SARI has no instansi; every recipient has name.
    const report = messageCoverage([BUDI, SARI], "Dear {name}, {instansi}");
    expect(report.ok).toBe(true);
    expect(report.unknownSlots).toEqual([]);
    expect(report.missing).toEqual([{ slot: "instansi", missingCount: 1 }]);
  });

  it("is ok when every referenced slot is fillable by every recipient", () => {
    const report = messageCoverage([BUDI, SARI], "Dear {name}, no {no}");
    expect(report).toEqual({ ok: true, unknownSlots: [], missing: [] });
  });

  it("ignores messages without placeholders", () => {
    expect(messageCoverage([BUDI], "Hello")).toEqual({ ok: true, unknownSlots: [], missing: [] });
  });
});

describe("escapeHtml", () => {
  it("escapes the five HTML-significant characters", () => {
    expect(escapeHtml(`<a href="x">&'`)).toBe("&lt;a href=&quot;x&quot;&gt;&amp;&#39;");
  });

  it("leaves plain text untouched", () => {
    expect(escapeHtml("Budi Santoso")).toBe("Budi Santoso");
  });
});
