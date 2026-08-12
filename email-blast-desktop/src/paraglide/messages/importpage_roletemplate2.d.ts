export { importpage_roletemplate2 as "importPage.roleTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Roletemplate2Inputs = {};
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Importpage_Roletemplate2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_roletemplate2: ((inputs?: Importpage_Roletemplate2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Roletemplate2Inputs, {
    locale?: "en" | "id";
}, {}>;
