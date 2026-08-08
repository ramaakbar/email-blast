export { templates_notemplatesyet2 as "templates.noTemplatesYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Notemplatesyet2Inputs = {};
/**
* | output |
* | --- |
* | "No templates yet" |
*
* @param {Templates_Notemplatesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_notemplatesyet2: ((inputs?: Templates_Notemplatesyet2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Notemplatesyet2Inputs, {
    locale?: "en" | "id";
}, {}>;
