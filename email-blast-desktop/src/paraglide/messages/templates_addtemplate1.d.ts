export { templates_addtemplate1 as "templates.addTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Addtemplate1Inputs = {};
/**
* | output |
* | --- |
* | "Add template" |
*
* @param {Templates_Addtemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_addtemplate1: ((inputs?: Templates_Addtemplate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Addtemplate1Inputs, {
    locale?: "en" | "id";
}, {}>;
