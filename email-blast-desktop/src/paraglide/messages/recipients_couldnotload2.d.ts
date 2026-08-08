export { recipients_couldnotload2 as "recipients.couldNotLoad" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Couldnotload2Inputs = {};
/**
* | output |
* | --- |
* | "Could not load recipients." |
*
* @param {Recipients_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_couldnotload2: ((inputs?: Recipients_Couldnotload2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Couldnotload2Inputs, {
    locale?: "en" | "id";
}, {}>;
