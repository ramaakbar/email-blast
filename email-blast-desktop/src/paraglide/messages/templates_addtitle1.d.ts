export { templates_addtitle1 as "templates.addTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Addtitle1Inputs = {};
/**
* | output |
* | --- |
* | "Add template" |
*
* @param {Templates_Addtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_addtitle1: ((inputs?: Templates_Addtitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Addtitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
