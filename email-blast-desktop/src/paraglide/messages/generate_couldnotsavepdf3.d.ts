export { generate_couldnotsavepdf3 as "generate.couldNotSavePdf" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Couldnotsavepdf3Inputs = {};
/**
* | output |
* | --- |
* | "Could not save the PDF." |
*
* @param {Generate_Couldnotsavepdf3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_couldnotsavepdf3: ((inputs?: Generate_Couldnotsavepdf3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Couldnotsavepdf3Inputs, {
    locale?: "en" | "id";
}, {}>;
