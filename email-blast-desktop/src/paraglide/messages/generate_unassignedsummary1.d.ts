export { generate_unassignedsummary1 as "generate.unassignedSummary" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Unassignedsummary1Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipients have a template-column value that is not assigned to any template." |
*
* @param {Generate_Unassignedsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_unassignedsummary1: ((inputs: Generate_Unassignedsummary1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Unassignedsummary1Inputs, {
    locale?: "en" | "id";
}, {}>;
