export { recipients_edit as "recipients.edit" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_EditInputs = {};
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Recipients_EditInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_edit: ((inputs?: Recipients_EditInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_EditInputs, {
    locale?: "en" | "id";
}, {}>;
