export { importpage_resetmapping2 as "importPage.resetMapping" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Resetmapping2Inputs = {};
/**
* | output |
* | --- |
* | "Reset mapping" |
*
* @param {Importpage_Resetmapping2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_resetmapping2: ((inputs?: Importpage_Resetmapping2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Resetmapping2Inputs, {
    locale?: "en" | "id";
}, {}>;
