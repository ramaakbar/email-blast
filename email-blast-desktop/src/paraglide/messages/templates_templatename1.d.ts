export { templates_templatename1 as "templates.templateName" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Templatename1Inputs = {};
/**
* | output |
* | --- |
* | "Template name" |
*
* @param {Templates_Templatename1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_templatename1: ((inputs?: Templates_Templatename1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Templatename1Inputs, {
    locale?: "en" | "id";
}, {}>;
