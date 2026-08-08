export { templates_deletedescription1 as "templates.deleteDescription" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Deletedescription1Inputs = {};
/**
* | output |
* | --- |
* | "The template is removed from the app. The file itself stays where it is." |
*
* @param {Templates_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_deletedescription1: ((inputs?: Templates_Deletedescription1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Deletedescription1Inputs, {
    locale?: "en" | "id";
}, {}>;
