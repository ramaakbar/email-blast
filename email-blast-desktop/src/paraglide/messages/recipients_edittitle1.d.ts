export { recipients_edittitle1 as "recipients.editTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Edittitle1Inputs = {};
/**
* | output |
* | --- |
* | "Edit recipient" |
*
* @param {Recipients_Edittitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_edittitle1: ((inputs?: Recipients_Edittitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Edittitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
