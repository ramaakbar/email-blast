export { recipients_phone as "recipients.phone" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_PhoneInputs = {};
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Recipients_PhoneInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_phone: ((inputs?: Recipients_PhoneInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_PhoneInputs, {
    locale?: "en" | "id";
}, {}>;
