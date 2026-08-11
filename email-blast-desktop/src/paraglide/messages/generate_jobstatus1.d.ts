export { generate_jobstatus1 as "generate.jobStatus" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Jobstatus1Inputs = {};
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Generate_Jobstatus1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_jobstatus1: ((inputs?: Generate_Jobstatus1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Jobstatus1Inputs, {
    locale?: "en" | "id";
}, {}>;
