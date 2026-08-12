export { generate_allblankvalues2 as "generate.allBlankValues" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Allblankvalues2Inputs = {
    column: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "All selected recipients have a blank {column} value - everyone uses the default template." |
*
* @param {Generate_Allblankvalues2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_allblankvalues2: ((inputs: Generate_Allblankvalues2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Allblankvalues2Inputs, {
    locale?: "en" | "id";
}, {}>;
