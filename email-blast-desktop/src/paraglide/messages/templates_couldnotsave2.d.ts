export { templates_couldnotsave2 as "templates.couldNotSave" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Couldnotsave2Inputs = {};
/**
* | output |
* | --- |
* | "Could not save the template." |
*
* @param {Templates_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_couldnotsave2: ((inputs?: Templates_Couldnotsave2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Couldnotsave2Inputs, {
    locale?: "en" | "id";
}, {}>;
