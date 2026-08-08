export { compose_senderaddress1 as "compose.senderAddress" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Senderaddress1Inputs = {};
/**
* | output |
* | --- |
* | "Sender address" |
*
* @param {Compose_Senderaddress1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_senderaddress1: ((inputs?: Compose_Senderaddress1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Senderaddress1Inputs, {
    locale?: "en" | "id";
}, {}>;
