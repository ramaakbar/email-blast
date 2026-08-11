export { nav_generate as "nav.generate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_GenerateInputs = {};
/**
* | output |
* | --- |
* | "Generate" |
*
* @param {Nav_GenerateInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_generate: ((inputs?: Nav_GenerateInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_GenerateInputs, {
    locale?: "en" | "id";
}, {}>;
