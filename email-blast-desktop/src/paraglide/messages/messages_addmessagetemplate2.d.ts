export { messages_addmessagetemplate2 as "messages.addMessageTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Addmessagetemplate2Inputs = {};
/**
* | output |
* | --- |
* | "Add message template" |
*
* @param {Messages_Addmessagetemplate2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_addmessagetemplate2: ((inputs?: Messages_Addmessagetemplate2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Addmessagetemplate2Inputs, {
    locale?: "en" | "id";
}, {}>;
