export { recipients_norecipientsyet2 as "recipients.noRecipientsYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Norecipientsyet2Inputs = {};
/**
* | output |
* | --- |
* | "No recipients yet" |
*
* @param {Recipients_Norecipientsyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_norecipientsyet2: ((inputs?: Recipients_Norecipientsyet2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Norecipientsyet2Inputs, {
    locale?: "en" | "id";
}, {}>;
