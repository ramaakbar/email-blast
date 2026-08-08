export { recipients_customfields1 as "recipients.customFields" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Customfields1Inputs = {};
/**
* | output |
* | --- |
* | "Custom fields" |
*
* @param {Recipients_Customfields1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_customfields1: ((inputs?: Recipients_Customfields1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Customfields1Inputs, {
    locale?: "en" | "id";
}, {}>;
