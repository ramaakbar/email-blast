export { importpage_rolephone2 as "importPage.rolePhone" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Rolephone2Inputs = {};
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Importpage_Rolephone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_rolephone2: ((inputs?: Importpage_Rolephone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Rolephone2Inputs, {
    locale?: "en" | "id";
}, {}>;
