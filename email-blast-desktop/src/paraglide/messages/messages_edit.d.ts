export { messages_edit as "messages.edit" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_EditInputs = {};
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Messages_EditInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_edit: ((inputs?: Messages_EditInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_EditInputs, {
    locale?: "en" | "id";
}, {}>;
