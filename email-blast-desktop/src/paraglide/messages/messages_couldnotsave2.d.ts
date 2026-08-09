export { messages_couldnotsave2 as "messages.couldNotSave" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Couldnotsave2Inputs = {};
/**
* | output |
* | --- |
* | "Could not save the message template." |
*
* @param {Messages_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_couldnotsave2: ((inputs?: Messages_Couldnotsave2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Couldnotsave2Inputs, {
    locale?: "en" | "id";
}, {}>;
