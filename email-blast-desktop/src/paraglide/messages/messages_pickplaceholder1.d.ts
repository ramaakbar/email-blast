export { messages_pickplaceholder1 as "messages.pickPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Pickplaceholder1Inputs = {};
/**
* | output |
* | --- |
* | "Choose a message template to copy…" |
*
* @param {Messages_Pickplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_pickplaceholder1: ((inputs?: Messages_Pickplaceholder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Pickplaceholder1Inputs, {
    locale?: "en" | "id";
}, {}>;
