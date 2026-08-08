export { importpage_title1 as "importPage.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Title1Inputs = {};
/**
* | output |
* | --- |
* | "Import" |
*
* @param {Importpage_Title1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_title1: ((inputs?: Importpage_Title1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Title1Inputs, {
    locale?: "en" | "id";
}, {}>;
