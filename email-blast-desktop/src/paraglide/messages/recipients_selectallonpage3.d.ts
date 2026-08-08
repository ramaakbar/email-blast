export { recipients_selectallonpage3 as "recipients.selectAllOnPage" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Selectallonpage3Inputs = {};
/**
* | output |
* | --- |
* | "Select all recipients on this page" |
*
* @param {Recipients_Selectallonpage3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_selectallonpage3: ((inputs?: Recipients_Selectallonpage3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Selectallonpage3Inputs, {
    locale?: "en" | "id";
}, {}>;
