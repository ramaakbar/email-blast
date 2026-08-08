export { importpage_description1 as "importPage.description" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Description1Inputs = {};
/**
* | output |
* | --- |
* | "Load recipients from an Excel file, review the preview, and commit them to the database." |
*
* @param {Importpage_Description1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_description1: ((inputs?: Importpage_Description1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Description1Inputs, {
    locale?: "en" | "id";
}, {}>;
