export { templates_addslot1 as "templates.addSlot" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Addslot1Inputs = {};
/**
* | output |
* | --- |
* | "Add slot" |
*
* @param {Templates_Addslot1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_addslot1: ((inputs?: Templates_Addslot1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Addslot1Inputs, {
    locale?: "en" | "id";
}, {}>;
