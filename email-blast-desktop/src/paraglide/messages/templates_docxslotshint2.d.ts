export { templates_docxslotshint2 as "templates.docxSlotsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Docxslotshint2Inputs = {
    placeholders: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Detected from the {placeholders} in the document. Add, rename, or remove slots freely." |
*
* @param {Templates_Docxslotshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_docxslotshint2: ((inputs: Templates_Docxslotshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Docxslotshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
