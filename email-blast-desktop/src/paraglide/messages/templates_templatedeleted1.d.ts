export { templates_templatedeleted1 as "templates.templateDeleted" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Templatedeleted1Inputs = {};
/**
* | output |
* | --- |
* | "Template deleted." |
*
* @param {Templates_Templatedeleted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_templatedeleted1: ((inputs?: Templates_Templatedeleted1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Templatedeleted1Inputs, {
    locale?: "en" | "id";
}, {}>;
