export { templatesservice_docxonly2 as "templatesService.docxOnly" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templatesservice_Docxonly2Inputs = {};
/**
* | output |
* | --- |
* | "Slot scanning works on .docx files only." |
*
* @param {Templatesservice_Docxonly2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templatesservice_docxonly2: ((inputs?: Templatesservice_Docxonly2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templatesservice_Docxonly2Inputs, {
    locale?: "en" | "id";
}, {}>;
