export { compose_missingdatahint2 as "compose.missingDataHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Missingdatahint2Inputs = {};
/**
* | output |
* | --- |
* | "Fix the recipients' data or pick another template before continuing - missing slots produce broken PDFs." |
*
* @param {Compose_Missingdatahint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_missingdatahint2: ((inputs?: Compose_Missingdatahint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Missingdatahint2Inputs, {
    locale?: "en" | "id";
}, {}>;
