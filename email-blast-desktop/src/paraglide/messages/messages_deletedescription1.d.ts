export { messages_deletedescription1 as "messages.deleteDescription" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Deletedescription1Inputs = {};
/**
* | output |
* | --- |
* | "Send Jobs keep their own copy of the message, so nothing you sent is changed. The template is removed from the library." |
*
* @param {Messages_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_deletedescription1: ((inputs?: Messages_Deletedescription1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Deletedescription1Inputs, {
    locale?: "en" | "id";
}, {}>;
