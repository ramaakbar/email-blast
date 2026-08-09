export { messages_messagestab1 as "messages.messagesTab" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Messagestab1Inputs = {};
/**
* | output |
* | --- |
* | "Messages" |
*
* @param {Messages_Messagestab1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_messagestab1: ((inputs?: Messages_Messagestab1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Messagestab1Inputs, {
    locale?: "en" | "id";
}, {}>;
