export { messages_notemplatesyet2 as "messages.noTemplatesYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Notemplatesyet2Inputs = {};
/**
* | output |
* | --- |
* | "No message templates yet" |
*
* @param {Messages_Notemplatesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_notemplatesyet2: ((inputs?: Messages_Notemplatesyet2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Notemplatesyet2Inputs, {
    locale?: "en" | "id";
}, {}>;
