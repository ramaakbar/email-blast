export { messages_saveastitle2 as "messages.saveAsTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Saveastitle2Inputs = {};
/**
* | output |
* | --- |
* | "Save message as template" |
*
* @param {Messages_Saveastitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_saveastitle2: ((inputs?: Messages_Saveastitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Saveastitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
