export { templates_couldnotload2 as "templates.couldNotLoad" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Couldnotload2Inputs = {};
/**
* | output |
* | --- |
* | "Could not load templates." |
*
* @param {Templates_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_couldnotload2: ((inputs?: Templates_Couldnotload2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Couldnotload2Inputs, {
    locale?: "en" | "id";
}, {}>;
