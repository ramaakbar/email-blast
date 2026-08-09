export { messages_documentstab1 as "messages.documentsTab" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Documentstab1Inputs = {};
/**
* | output |
* | --- |
* | "Documents" |
*
* @param {Messages_Documentstab1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_documentstab1: ((inputs?: Messages_Documentstab1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Documentstab1Inputs, {
    locale?: "en" | "id";
}, {}>;
