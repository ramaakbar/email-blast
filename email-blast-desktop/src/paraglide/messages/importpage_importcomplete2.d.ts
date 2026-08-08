export { importpage_importcomplete2 as "importPage.importComplete" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importcomplete2Inputs = {};
/**
* | output |
* | --- |
* | "Import complete" |
*
* @param {Importpage_Importcomplete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importcomplete2: ((inputs?: Importpage_Importcomplete2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importcomplete2Inputs, {
    locale?: "en" | "id";
}, {}>;
