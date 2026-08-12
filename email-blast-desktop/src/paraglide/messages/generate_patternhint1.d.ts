export { generate_patternhint1 as "generate.patternHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Patternhint1Inputs = {};
/**
* | output |
* | --- |
* | "All recipients of this job are named by this one pattern, whichever template they used." |
*
* @param {Generate_Patternhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_patternhint1: ((inputs?: Generate_Patternhint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Patternhint1Inputs, {
    locale?: "en" | "id";
}, {}>;
