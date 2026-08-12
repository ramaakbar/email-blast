export { generate_assignmenttitle1 as "generate.assignmentTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Assignmenttitle1Inputs = {};
/**
* | output |
* | --- |
* | "Assign each value to a template" |
*
* @param {Generate_Assignmenttitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_assignmenttitle1: ((inputs?: Generate_Assignmenttitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Assignmenttitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
