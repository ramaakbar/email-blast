export { messages_picklabel1 as "messages.pickLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Picklabel1Inputs = {};
/**
* | output |
* | --- |
* | "Message template" |
*
* @param {Messages_Picklabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_picklabel1: ((inputs?: Messages_Picklabel1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Picklabel1Inputs, {
    locale?: "en" | "id";
}, {}>;
