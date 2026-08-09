export { messages_addtitle1 as "messages.addTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Addtitle1Inputs = {};
/**
* | output |
* | --- |
* | "New message template" |
*
* @param {Messages_Addtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_addtitle1: ((inputs?: Messages_Addtitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Addtitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
