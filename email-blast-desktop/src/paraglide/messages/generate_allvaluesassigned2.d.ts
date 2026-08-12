export { generate_allvaluesassigned2 as "generate.allValuesAssigned" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Allvaluesassigned2Inputs = {};
/**
* | output |
* | --- |
* | "Every template-column value is assigned to a template." |
*
* @param {Generate_Allvaluesassigned2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_allvaluesassigned2: ((inputs?: Generate_Allvaluesassigned2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Allvaluesassigned2Inputs, {
    locale?: "en" | "id";
}, {}>;
