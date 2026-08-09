export { templates_slotx1 as "templates.slotX" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Slotx1Inputs = {};
/**
* | output |
* | --- |
* | "X" |
*
* @param {Templates_Slotx1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_slotx1: ((inputs?: Templates_Slotx1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Slotx1Inputs, {
    locale?: "en" | "id";
}, {}>;
