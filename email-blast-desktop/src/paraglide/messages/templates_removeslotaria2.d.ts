export { templates_removeslotaria2 as "templates.removeSlotAria" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Removeslotaria2Inputs = {
    index: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Remove slot {index}" |
*
* @param {Templates_Removeslotaria2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_removeslotaria2: ((inputs: Templates_Removeslotaria2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Removeslotaria2Inputs, {
    locale?: "en" | "id";
}, {}>;
