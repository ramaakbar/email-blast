export { messages_nobodyyet2 as "messages.noBodyYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Nobodyyet2Inputs = {};
/**
* | output |
* | --- |
* | "This template has an empty body." |
*
* @param {Messages_Nobodyyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_nobodyyet2: ((inputs?: Messages_Nobodyyet2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Nobodyyet2Inputs, {
    locale?: "en" | "id";
}, {}>;
