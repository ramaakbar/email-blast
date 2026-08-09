export { compose_replytoplaceholder2 as "compose.replyToPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Replytoplaceholder2Inputs = {};
/**
* | output |
* | --- |
* | "e.g. sekretariat@example.org" |
*
* @param {Compose_Replytoplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_replytoplaceholder2: ((inputs?: Compose_Replytoplaceholder2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Replytoplaceholder2Inputs, {
    locale?: "en" | "id";
}, {}>;
