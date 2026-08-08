export { nav_recipients as "nav.recipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_RecipientsInputs = {};
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Nav_RecipientsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_recipients: ((inputs?: Nav_RecipientsInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_RecipientsInputs, {
    locale?: "en" | "id";
}, {}>;
