export { recipients_selectrecipient1 as "recipients.selectRecipient" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Selectrecipient1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Select {name}" |
*
* @param {Recipients_Selectrecipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_selectrecipient1: ((inputs: Recipients_Selectrecipient1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Selectrecipient1Inputs, {
    locale?: "en" | "id";
}, {}>;
