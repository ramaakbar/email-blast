export { generate_description as "generate.description" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_DescriptionInputs = {};
/**
* | output |
* | --- |
* | "Generate documents for the selected recipients - no email configuration needed." |
*
* @param {Generate_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_description: ((inputs?: Generate_DescriptionInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_DescriptionInputs, {
    locale?: "en" | "id";
}, {}>;
