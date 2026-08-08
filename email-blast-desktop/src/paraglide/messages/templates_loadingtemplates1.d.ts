export { templates_loadingtemplates1 as "templates.loadingTemplates" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Loadingtemplates1Inputs = {};
/**
* | output |
* | --- |
* | "Loading templates…" |
*
* @param {Templates_Loadingtemplates1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_loadingtemplates1: ((inputs?: Templates_Loadingtemplates1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Loadingtemplates1Inputs, {
    locale?: "en" | "id";
}, {}>;
