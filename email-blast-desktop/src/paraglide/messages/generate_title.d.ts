export { generate_title as "generate.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_TitleInputs = {};
/**
* | output |
* | --- |
* | "Generate" |
*
* @param {Generate_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_title: ((inputs?: Generate_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
