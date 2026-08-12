export { templates_fontaddfailed2 as "templates.fontAddFailed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Fontaddfailed2Inputs = {};
/**
* | output |
* | --- |
* | "Could not add the font file." |
*
* @param {Templates_Fontaddfailed2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_fontaddfailed2: ((inputs?: Templates_Fontaddfailed2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Fontaddfailed2Inputs, {
    locale?: "en" | "id";
}, {}>;
