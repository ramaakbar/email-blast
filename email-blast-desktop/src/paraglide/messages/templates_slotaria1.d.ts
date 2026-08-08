export { templates_slotaria1 as "templates.slotAria" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Slotaria1Inputs = {
    index: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Slot {index}" |
*
* @param {Templates_Slotaria1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_slotaria1: ((inputs: Templates_Slotaria1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Slotaria1Inputs, {
    locale?: "en" | "id";
}, {}>;
