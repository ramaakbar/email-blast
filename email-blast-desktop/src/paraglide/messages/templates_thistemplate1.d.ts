export { templates_thistemplate1 as "templates.thisTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Thistemplate1Inputs = {};
/**
* | output |
* | --- |
* | "this template" |
*
* @param {Templates_Thistemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_thistemplate1: ((inputs?: Templates_Thistemplate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Thistemplate1Inputs, {
    locale?: "en" | "id";
}, {}>;
