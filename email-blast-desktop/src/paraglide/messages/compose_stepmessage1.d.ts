export { compose_stepmessage1 as "compose.stepMessage" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Stepmessage1Inputs = {};
/**
* | output |
* | --- |
* | "Message" |
*
* @param {Compose_Stepmessage1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_stepmessage1: ((inputs?: Compose_Stepmessage1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Stepmessage1Inputs, {
    locale?: "en" | "id";
}, {}>;
