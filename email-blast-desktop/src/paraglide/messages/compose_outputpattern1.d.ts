export { compose_outputpattern1 as "compose.outputPattern" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Outputpattern1Inputs = {};
/**
* | output |
* | --- |
* | "Output pattern" |
*
* @param {Compose_Outputpattern1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_outputpattern1: ((inputs?: Compose_Outputpattern1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Outputpattern1Inputs, {
    locale?: "en" | "id";
}, {}>;
