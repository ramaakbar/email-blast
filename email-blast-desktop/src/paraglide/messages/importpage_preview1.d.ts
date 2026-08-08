export { importpage_preview1 as "importPage.preview" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Preview1Inputs = {};
/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Importpage_Preview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_preview1: ((inputs?: Importpage_Preview1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Preview1Inputs, {
    locale?: "en" | "id";
}, {}>;
