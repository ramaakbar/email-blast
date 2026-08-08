export { compose_sendingfailed1 as "compose.sendingFailed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendingfailed1Inputs = {};
/**
* | output |
* | --- |
* | "Sending failed." |
*
* @param {Compose_Sendingfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendingfailed1: ((inputs?: Compose_Sendingfailed1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendingfailed1Inputs, {
    locale?: "en" | "id";
}, {}>;
