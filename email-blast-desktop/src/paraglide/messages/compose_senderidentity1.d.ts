export { compose_senderidentity1 as "compose.senderIdentity" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Senderidentity1Inputs = {};
/**
* | output |
* | --- |
* | "Sender identity" |
*
* @param {Compose_Senderidentity1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_senderidentity1: ((inputs?: Compose_Senderidentity1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Senderidentity1Inputs, {
    locale?: "en" | "id";
}, {}>;
