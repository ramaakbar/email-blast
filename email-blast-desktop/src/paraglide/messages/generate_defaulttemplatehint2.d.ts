export { generate_defaulttemplatehint2 as "generate.defaultTemplateHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Defaulttemplatehint2Inputs = {
    column: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Recipients with a blank {column} value use this template." |
*
* @param {Generate_Defaulttemplatehint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_defaulttemplatehint2: ((inputs: Generate_Defaulttemplatehint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Defaulttemplatehint2Inputs, {
    locale?: "en" | "id";
}, {}>;
