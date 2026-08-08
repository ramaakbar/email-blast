export { compose_generationfailed1 as "compose.generationFailed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Generationfailed1Inputs = {};
/**
* | output |
* | --- |
* | "Generation failed." |
*
* @param {Compose_Generationfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_generationfailed1: ((inputs?: Compose_Generationfailed1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Generationfailed1Inputs, {
    locale?: "en" | "id";
}, {}>;
