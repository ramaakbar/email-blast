export { templates_slotcountone2 as "templates.slotCountOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Slotcountone2Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} slot · {stamp}" |
*
* @param {Templates_Slotcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_slotcountone2: ((inputs: Templates_Slotcountone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Slotcountone2Inputs, {
    locale?: "en" | "id";
}, {}>;
