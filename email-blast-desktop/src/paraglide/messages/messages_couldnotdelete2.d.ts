export { messages_couldnotdelete2 as "messages.couldNotDelete" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Couldnotdelete2Inputs = {};
/**
* | output |
* | --- |
* | "Could not delete the message template." |
*
* @param {Messages_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_couldnotdelete2: ((inputs?: Messages_Couldnotdelete2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Couldnotdelete2Inputs, {
    locale?: "en" | "id";
}, {}>;
