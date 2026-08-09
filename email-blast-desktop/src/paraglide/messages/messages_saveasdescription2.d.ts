export { messages_saveasdescription2 as "messages.saveAsDescription" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Saveasdescription2Inputs = {};
/**
* | output |
* | --- |
* | "The current subject and body are saved as a new Message Template. Copy-on-pick: jobs that already picked it stay unchanged, and editing this template never c..." |
*
* @param {Messages_Saveasdescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_saveasdescription2: ((inputs?: Messages_Saveasdescription2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Saveasdescription2Inputs, {
    locale?: "en" | "id";
}, {}>;
