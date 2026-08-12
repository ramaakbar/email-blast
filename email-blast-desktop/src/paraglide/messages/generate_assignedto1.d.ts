export { generate_assignedto1 as "generate.assignedTo" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Assignedto1Inputs = {
    value: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Template for \"{value}\"" |
*
* @param {Generate_Assignedto1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_assignedto1: ((inputs: Generate_Assignedto1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Assignedto1Inputs, {
    locale?: "en" | "id";
}, {}>;
