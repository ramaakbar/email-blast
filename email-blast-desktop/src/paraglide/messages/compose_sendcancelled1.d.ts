export { compose_sendcancelled1 as "compose.sendCancelled" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendcancelled1Inputs = {};
/**
* | output |
* | --- |
* | "Send cancelled." |
*
* @param {Compose_Sendcancelled1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendcancelled1: ((inputs?: Compose_Sendcancelled1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendcancelled1Inputs, {
    locale?: "en" | "id";
}, {}>;
