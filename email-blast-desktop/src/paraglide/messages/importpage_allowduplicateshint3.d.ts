export { importpage_allowduplicateshint3 as "importPage.allowDuplicatesHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Allowduplicateshint3Inputs = {};
/**
* | output |
* | --- |
* | "Import every row even when emails repeat (for test blasts)." |
*
* @param {Importpage_Allowduplicateshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_allowduplicateshint3: ((inputs?: Importpage_Allowduplicateshint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Allowduplicateshint3Inputs, {
    locale?: "en" | "id";
}, {}>;
