export { generate_reopenjob1 as "generate.reopenJob" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Reopenjob1Inputs = {};
/**
* | output |
* | --- |
* | "Reopen" |
*
* @param {Generate_Reopenjob1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_reopenjob1: ((inputs?: Generate_Reopenjob1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Reopenjob1Inputs, {
    locale?: "en" | "id";
}, {}>;
