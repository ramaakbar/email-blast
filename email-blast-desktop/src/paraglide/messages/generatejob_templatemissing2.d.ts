export { generatejob_templatemissing2 as "generateJob.templateMissing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Templatemissing2Inputs = {};
/**
* | output |
* | --- |
* | "The template no longer exists." |
*
* @param {Generatejob_Templatemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_templatemissing2: ((inputs?: Generatejob_Templatemissing2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Templatemissing2Inputs, {
    locale?: "en" | "id";
}, {}>;
