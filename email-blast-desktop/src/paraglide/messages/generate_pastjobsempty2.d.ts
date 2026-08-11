export { generate_pastjobsempty2 as "generate.pastJobsEmpty" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Pastjobsempty2Inputs = {};
/**
* | output |
* | --- |
* | "No generate jobs yet." |
*
* @param {Generate_Pastjobsempty2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_pastjobsempty2: ((inputs?: Generate_Pastjobsempty2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Pastjobsempty2Inputs, {
    locale?: "en" | "id";
}, {}>;
