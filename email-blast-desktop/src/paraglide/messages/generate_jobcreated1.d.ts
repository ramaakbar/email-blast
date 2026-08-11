export { generate_jobcreated1 as "generate.jobCreated" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Jobcreated1Inputs = {};
/**
* | output |
* | --- |
* | "Created" |
*
* @param {Generate_Jobcreated1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_jobcreated1: ((inputs?: Generate_Jobcreated1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Jobcreated1Inputs, {
    locale?: "en" | "id";
}, {}>;
