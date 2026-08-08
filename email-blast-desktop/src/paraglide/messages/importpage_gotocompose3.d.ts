export { importpage_gotocompose3 as "importPage.goToCompose" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Gotocompose3Inputs = {};
/**
* | output |
* | --- |
* | "Go to Compose" |
*
* @param {Importpage_Gotocompose3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_gotocompose3: ((inputs?: Importpage_Gotocompose3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Gotocompose3Inputs, {
    locale?: "en" | "id";
}, {}>;
