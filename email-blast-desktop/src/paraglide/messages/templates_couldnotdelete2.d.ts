export { templates_couldnotdelete2 as "templates.couldNotDelete" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Couldnotdelete2Inputs = {};
/**
* | output |
* | --- |
* | "Could not delete the template." |
*
* @param {Templates_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_couldnotdelete2: ((inputs?: Templates_Couldnotdelete2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Couldnotdelete2Inputs, {
    locale?: "en" | "id";
}, {}>;
