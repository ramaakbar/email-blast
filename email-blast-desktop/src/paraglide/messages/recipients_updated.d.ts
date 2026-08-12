export { recipients_updated as "recipients.updated" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_UpdatedInputs = {};
/**
* | output |
* | --- |
* | "Recipient updated." |
*
* @param {Recipients_UpdatedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_updated: ((inputs?: Recipients_UpdatedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_UpdatedInputs, {
    locale?: "en" | "id";
}, {}>;
