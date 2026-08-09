export { messages_savetemplate1 as "messages.saveTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Savetemplate1Inputs = {};
/**
* | output |
* | --- |
* | "Save template" |
*
* @param {Messages_Savetemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_savetemplate1: ((inputs?: Messages_Savetemplate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Savetemplate1Inputs, {
    locale?: "en" | "id";
}, {}>;
