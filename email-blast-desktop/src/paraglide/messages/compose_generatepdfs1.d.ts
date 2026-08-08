export { compose_generatepdfs1 as "compose.generatePdfs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Generatepdfs1Inputs = {};
/**
* | output |
* | --- |
* | "Generate PDFs" |
*
* @param {Compose_Generatepdfs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_generatepdfs1: ((inputs?: Compose_Generatepdfs1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Generatepdfs1Inputs, {
    locale?: "en" | "id";
}, {}>;
