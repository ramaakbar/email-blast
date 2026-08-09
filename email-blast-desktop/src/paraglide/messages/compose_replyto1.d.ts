export { compose_replyto1 as "compose.replyTo" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Replyto1Inputs = {};
/**
* | output |
* | --- |
* | "Reply-to" |
*
* @param {Compose_Replyto1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_replyto1: ((inputs?: Compose_Replyto1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Replyto1Inputs, {
    locale?: "en" | "id";
}, {}>;
