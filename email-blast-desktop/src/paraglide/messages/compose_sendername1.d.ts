export { compose_sendername1 as "compose.senderName" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendername1Inputs = {};
/**
* | output |
* | --- |
* | "Sender name" |
*
* @param {Compose_Sendername1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendername1: ((inputs?: Compose_Sendername1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendername1Inputs, {
    locale?: "en" | "id";
}, {}>;
