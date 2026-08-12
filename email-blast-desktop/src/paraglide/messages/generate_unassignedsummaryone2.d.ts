export { generate_unassignedsummaryone2 as "generate.unassignedSummaryOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Unassignedsummaryone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipient has a template-column value that is not assigned to any template." |
*
* @param {Generate_Unassignedsummaryone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_unassignedsummaryone2: ((inputs: Generate_Unassignedsummaryone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Unassignedsummaryone2Inputs, {
    locale?: "en" | "id";
}, {}>;
