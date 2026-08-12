export { generate_defaulttemplatelabel2 as "generate.defaultTemplateLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Defaulttemplatelabel2Inputs = {};
/**
* | output |
* | --- |
* | "Default template (blank values)" |
*
* @param {Generate_Defaulttemplatelabel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_defaulttemplatelabel2: ((inputs?: Generate_Defaulttemplatelabel2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Defaulttemplatelabel2Inputs, {
    locale?: "en" | "id";
}, {}>;
