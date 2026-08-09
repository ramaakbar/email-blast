export { messages_saved as "messages.saved" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_SavedInputs = {};
/**
* | output |
* | --- |
* | "Message template saved." |
*
* @param {Messages_SavedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_saved: ((inputs?: Messages_SavedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_SavedInputs, {
    locale?: "en" | "id";
}, {}>;
