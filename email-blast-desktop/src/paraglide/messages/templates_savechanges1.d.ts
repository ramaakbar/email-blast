export { templates_savechanges1 as "templates.saveChanges" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Savechanges1Inputs = {};
/**
* | output |
* | --- |
* | "Save changes" |
*
* @param {Templates_Savechanges1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_savechanges1: ((inputs?: Templates_Savechanges1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Savechanges1Inputs, {
    locale?: "en" | "id";
}, {}>;
