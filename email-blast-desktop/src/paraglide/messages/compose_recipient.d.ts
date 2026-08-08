export { compose_recipient as "compose.recipient" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_RecipientInputs = {};
/**
* | output |
* | --- |
* | "Recipient" |
*
* @param {Compose_RecipientInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_recipient: ((inputs?: Compose_RecipientInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_RecipientInputs, {
    locale?: "en" | "id";
}, {}>;
