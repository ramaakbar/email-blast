export { templates_replaceslots1 as "templates.replaceSlots" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Replaceslots1Inputs = {};
/**
* | output |
* | --- |
* | "Replace slots" |
*
* @param {Templates_Replaceslots1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_replaceslots1: ((inputs?: Templates_Replaceslots1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Replaceslots1Inputs, {
    locale?: "en" | "id";
}, {}>;
