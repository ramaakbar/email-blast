export { compose_stepgenerate1 as "compose.stepGenerate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Stepgenerate1Inputs = {};
/**
* | output |
* | --- |
* | "Generate & Review" |
*
* @param {Compose_Stepgenerate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_stepgenerate1: ((inputs?: Compose_Stepgenerate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Stepgenerate1Inputs, {
    locale?: "en" | "id";
}, {}>;
