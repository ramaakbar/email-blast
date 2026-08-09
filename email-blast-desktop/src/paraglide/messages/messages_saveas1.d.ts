export { messages_saveas1 as "messages.saveAs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Saveas1Inputs = {};
/**
* | output |
* | --- |
* | "Save as template" |
*
* @param {Messages_Saveas1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_saveas1: ((inputs?: Messages_Saveas1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Saveas1Inputs, {
    locale?: "en" | "id";
}, {}>;
