export { importpage_importing1 as "importPage.importing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importing1Inputs = {};
/**
* | output |
* | --- |
* | "Importing…" |
*
* @param {Importpage_Importing1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importing1: ((inputs?: Importpage_Importing1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importing1Inputs, {
    locale?: "en" | "id";
}, {}>;
