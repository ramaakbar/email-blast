export { templates_slotalign1 as "templates.slotAlign" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Slotalign1Inputs = {};
/**
* | output |
* | --- |
* | "Alignment" |
*
* @param {Templates_Slotalign1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_slotalign1: ((inputs?: Templates_Slotalign1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Slotalign1Inputs, {
    locale?: "en" | "id";
}, {}>;
