export { templates_registertemplate1 as "templates.registerTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Registertemplate1Inputs = {};
/**
* | output |
* | --- |
* | "Register template" |
*
* @param {Templates_Registertemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_registertemplate1: ((inputs?: Templates_Registertemplate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Registertemplate1Inputs, {
    locale?: "en" | "id";
}, {}>;
