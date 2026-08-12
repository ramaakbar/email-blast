export { templates_fontadded1 as "templates.fontAdded" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Fontadded1Inputs = {
    family: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Font \"{family}\" added." |
*
* @param {Templates_Fontadded1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_fontadded1: ((inputs: Templates_Fontadded1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Fontadded1Inputs, {
    locale?: "en" | "id";
}, {}>;
