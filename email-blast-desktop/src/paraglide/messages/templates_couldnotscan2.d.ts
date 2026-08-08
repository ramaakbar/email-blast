export { templates_couldnotscan2 as "templates.couldNotScan" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Couldnotscan2Inputs = {};
/**
* | output |
* | --- |
* | "Could not scan the template for slots." |
*
* @param {Templates_Couldnotscan2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_couldnotscan2: ((inputs?: Templates_Couldnotscan2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Couldnotscan2Inputs, {
    locale?: "en" | "id";
}, {}>;
