export { generate_jobtemplate1 as "generate.jobTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Jobtemplate1Inputs = {};
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Generate_Jobtemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_jobtemplate1: ((inputs?: Generate_Jobtemplate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Jobtemplate1Inputs, {
    locale?: "en" | "id";
}, {}>;
