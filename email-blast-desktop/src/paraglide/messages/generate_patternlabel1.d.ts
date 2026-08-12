export { generate_patternlabel1 as "generate.patternLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Patternlabel1Inputs = {};
/**
* | output |
* | --- |
* | "Output naming pattern (shared by all templates)" |
*
* @param {Generate_Patternlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_patternlabel1: ((inputs?: Generate_Patternlabel1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Patternlabel1Inputs, {
    locale?: "en" | "id";
}, {}>;
