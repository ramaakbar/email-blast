export { messages_name as "messages.name" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_NameInputs = {};
/**
* | output |
* | --- |
* | "Template name" |
*
* @param {Messages_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_name: ((inputs?: Messages_NameInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_NameInputs, {
    locale?: "en" | "id";
}, {}>;
