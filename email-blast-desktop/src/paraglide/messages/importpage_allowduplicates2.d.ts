export { importpage_allowduplicates2 as "importPage.allowDuplicates" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Allowduplicates2Inputs = {};
/**
* | output |
* | --- |
* | "Allow duplicate emails" |
*
* @param {Importpage_Allowduplicates2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_allowduplicates2: ((inputs?: Importpage_Allowduplicates2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Allowduplicates2Inputs, {
    locale?: "en" | "id";
}, {}>;
