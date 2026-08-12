export { importpage_gotogenerate3 as "importPage.goToGenerate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Gotogenerate3Inputs = {};
/**
* | output |
* | --- |
* | "Go to Generate" |
*
* @param {Importpage_Gotogenerate3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_gotogenerate3: ((inputs?: Importpage_Gotogenerate3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Gotogenerate3Inputs, {
    locale?: "en" | "id";
}, {}>;
