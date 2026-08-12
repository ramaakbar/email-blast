export { templates_addfont1 as "templates.addFont" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Addfont1Inputs = {};
/**
* | output |
* | --- |
* | "Add font…" |
*
* @param {Templates_Addfont1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_addfont1: ((inputs?: Templates_Addfont1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Addfont1Inputs, {
    locale?: "en" | "id";
}, {}>;
