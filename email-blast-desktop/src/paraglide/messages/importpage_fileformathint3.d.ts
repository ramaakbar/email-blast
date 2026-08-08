export { importpage_fileformathint3 as "importPage.fileFormatHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Fileformathint3Inputs = {};
/**
* | output |
* | --- |
* | ".xlsx or .xls, with the recipient list in the first sheet" |
*
* @param {Importpage_Fileformathint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_fileformathint3: ((inputs?: Importpage_Fileformathint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Fileformathint3Inputs, {
    locale?: "en" | "id";
}, {}>;
