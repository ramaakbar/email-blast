export { templates_fontlistfailed2 as "templates.fontListFailed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Fontlistfailed2Inputs = {};
/**
* | output |
* | --- |
* | "Could not load the available fonts." |
*
* @param {Templates_Fontlistfailed2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_fontlistfailed2: ((inputs?: Templates_Fontlistfailed2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Fontlistfailed2Inputs, {
    locale?: "en" | "id";
}, {}>;
