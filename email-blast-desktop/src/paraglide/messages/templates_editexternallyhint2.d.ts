export { templates_editexternallyhint2 as "templates.editExternallyHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Editexternallyhint2Inputs = {};
/**
* | output |
* | --- |
* | "Edit the template file itself in Word (DOCX) or Figma/Photoshop (images) - Email Blast fills it exactly as saved." |
*
* @param {Templates_Editexternallyhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_editexternallyhint2: ((inputs?: Templates_Editexternallyhint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Editexternallyhint2Inputs, {
    locale?: "en" | "id";
}, {}>;
