export { generatejob_nopdfproduced3 as "generateJob.noPdfProduced" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Nopdfproduced3Inputs = {};
/**
* | output |
* | --- |
* | "LibreOffice produced no PDF for this letter." |
*
* @param {Generatejob_Nopdfproduced3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_nopdfproduced3: ((inputs?: Generatejob_Nopdfproduced3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Nopdfproduced3Inputs, {
    locale?: "en" | "id";
}, {}>;
