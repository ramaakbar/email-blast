export { generatejob_templatefilemissing3 as "generateJob.templateFileMissing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Templatefilemissing3Inputs = {
    path: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "The template file is missing: \"{path}\". It may have been moved or deleted." |
*
* @param {Generatejob_Templatefilemissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_templatefilemissing3: ((inputs: Generatejob_Templatefilemissing3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Templatefilemissing3Inputs, {
    locale?: "en" | "id";
}, {}>;
