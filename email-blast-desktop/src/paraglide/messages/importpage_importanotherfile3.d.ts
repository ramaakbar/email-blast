export { importpage_importanotherfile3 as "importPage.importAnotherFile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importanotherfile3Inputs = {};
/**
* | output |
* | --- |
* | "Import another file" |
*
* @param {Importpage_Importanotherfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importanotherfile3: ((inputs?: Importpage_Importanotherfile3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importanotherfile3Inputs, {
    locale?: "en" | "id";
}, {}>;
