export { compose_stepsend1 as "compose.stepSend" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Stepsend1Inputs = {};
/**
* | output |
* | --- |
* | "Send" |
*
* @param {Compose_Stepsend1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_stepsend1: ((inputs?: Compose_Stepsend1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Stepsend1Inputs, {
    locale?: "en" | "id";
}, {}>;
