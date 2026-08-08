export { importpage_parsing1 as "importPage.parsing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Parsing1Inputs = {
    fileName: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Parsing {fileName}…" |
*
* @param {Importpage_Parsing1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_parsing1: ((inputs: Importpage_Parsing1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Parsing1Inputs, {
    locale?: "en" | "id";
}, {}>;
