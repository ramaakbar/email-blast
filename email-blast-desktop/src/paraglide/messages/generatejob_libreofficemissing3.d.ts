export { generatejob_libreofficemissing3 as "generateJob.libreOfficeMissing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Libreofficemissing3Inputs = {};
/**
* | output |
* | --- |
* | "LibreOffice is not installed, so DOCX letters cannot be converted to PDF." |
*
* @param {Generatejob_Libreofficemissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_libreofficemissing3: ((inputs?: Generatejob_Libreofficemissing3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Libreofficemissing3Inputs, {
    locale?: "en" | "id";
}, {}>;
