export { recipients_deleteselected1 as "recipients.deleteSelected" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Deleteselected1Inputs = {};
/**
* | output |
* | --- |
* | "Delete selected" |
*
* @param {Recipients_Deleteselected1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_deleteselected1: ((inputs?: Recipients_Deleteselected1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Deleteselected1Inputs, {
    locale?: "en" | "id";
}, {}>;
