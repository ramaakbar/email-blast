export { messages_deleted as "messages.deleted" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_DeletedInputs = {};
/**
* | output |
* | --- |
* | "Message template deleted." |
*
* @param {Messages_DeletedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_deleted: ((inputs?: Messages_DeletedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_DeletedInputs, {
    locale?: "en" | "id";
}, {}>;
