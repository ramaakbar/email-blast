export { compose_recipients as "compose.recipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_RecipientsInputs = {};
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Compose_RecipientsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_recipients: ((inputs?: Compose_RecipientsInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_RecipientsInputs, {
    locale?: "en" | "id";
}, {}>;
