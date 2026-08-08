export { recipients_nocustomfields2 as "recipients.noCustomFields" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Nocustomfields2Inputs = {};
/**
* | output |
* | --- |
* | "No custom fields." |
*
* @param {Recipients_Nocustomfields2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_nocustomfields2: ((inputs?: Recipients_Nocustomfields2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Nocustomfields2Inputs, {
    locale?: "en" | "id";
}, {}>;
