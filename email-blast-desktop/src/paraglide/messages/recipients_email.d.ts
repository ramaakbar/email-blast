export { recipients_email as "recipients.email" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_EmailInputs = {};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Recipients_EmailInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_email: ((inputs?: Recipients_EmailInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_EmailInputs, {
    locale?: "en" | "id";
}, {}>;
