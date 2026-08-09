export { messages_couldnotload2 as "messages.couldNotLoad" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Couldnotload2Inputs = {};
/**
* | output |
* | --- |
* | "Could not load message templates." |
*
* @param {Messages_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_couldnotload2: ((inputs?: Messages_Couldnotload2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Couldnotload2Inputs, {
    locale?: "en" | "id";
}, {}>;
