export { generate_assignmenthint1 as "generate.assignmentHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Assignmenthint1Inputs = {};
/**
* | output |
* | --- |
* | "Recipients whose value is not assigned to any template block generation until it is." |
*
* @param {Generate_Assignmenthint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_assignmenthint1: ((inputs?: Generate_Assignmenthint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Assignmenthint1Inputs, {
    locale?: "en" | "id";
}, {}>;
