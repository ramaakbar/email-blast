export { generate_pastjobs1 as "generate.pastJobs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Pastjobs1Inputs = {};
/**
* | output |
* | --- |
* | "Past Generate Jobs" |
*
* @param {Generate_Pastjobs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_pastjobs1: ((inputs?: Generate_Pastjobs1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Pastjobs1Inputs, {
    locale?: "en" | "id";
}, {}>;
