export { importpage_roleskip2 as "importPage.roleSkip" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Roleskip2Inputs = {};
/**
* | output |
* | --- |
* | "Skip" |
*
* @param {Importpage_Roleskip2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_roleskip2: ((inputs?: Importpage_Roleskip2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Roleskip2Inputs, {
    locale?: "en" | "id";
}, {}>;
