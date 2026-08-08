export { templates_slotcountother2 as "templates.slotCountOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Slotcountother2Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} slots · {stamp}" |
*
* @param {Templates_Slotcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_slotcountother2: ((inputs: Templates_Slotcountother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Slotcountother2Inputs, {
    locale?: "en" | "id";
}, {}>;
