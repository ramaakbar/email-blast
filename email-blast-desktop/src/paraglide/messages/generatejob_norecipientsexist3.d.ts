export { generatejob_norecipientsexist3 as "generateJob.noRecipientsExist" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Norecipientsexist3Inputs = {};
/**
* | output |
* | --- |
* | "None of the selected recipients still exist." |
*
* @param {Generatejob_Norecipientsexist3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_norecipientsexist3: ((inputs?: Generatejob_Norecipientsexist3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Norecipientsexist3Inputs, {
    locale?: "en" | "id";
}, {}>;
