export { recipients_namerequired1 as "recipients.nameRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Namerequired1Inputs = {};
/**
* | output |
* | --- |
* | "Name is required." |
*
* @param {Recipients_Namerequired1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_namerequired1: ((inputs?: Recipients_Namerequired1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Namerequired1Inputs, {
    locale?: "en" | "id";
}, {}>;
