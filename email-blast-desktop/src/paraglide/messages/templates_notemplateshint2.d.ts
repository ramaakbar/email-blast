export { templates_notemplateshint2 as "templates.noTemplatesHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Notemplateshint2Inputs = {};
/**
* | output |
* | --- |
* | "Register a DOCX letter template or an image certificate template to generate personalized documents." |
*
* @param {Templates_Notemplateshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_notemplateshint2: ((inputs?: Templates_Notemplateshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Notemplateshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
