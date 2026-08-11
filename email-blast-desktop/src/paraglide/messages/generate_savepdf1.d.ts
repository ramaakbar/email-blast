export { generate_savepdf1 as "generate.savePdf" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Savepdf1Inputs = {};
/**
* | output |
* | --- |
* | "Save PDF" |
*
* @param {Generate_Savepdf1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_savepdf1: ((inputs?: Generate_Savepdf1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Savepdf1Inputs, {
    locale?: "en" | "id";
}, {}>;
