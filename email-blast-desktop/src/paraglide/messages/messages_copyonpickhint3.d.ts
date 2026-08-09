export { messages_copyonpickhint3 as "messages.copyOnPickHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Copyonpickhint3Inputs = {};
/**
* | output |
* | --- |
* | "Copy-on-pick: a job that picked this template keeps its own copy - editing it here never changes a job, and editing a job's message never changes this template." |
*
* @param {Messages_Copyonpickhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_copyonpickhint3: ((inputs?: Messages_Copyonpickhint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Copyonpickhint3Inputs, {
    locale?: "en" | "id";
}, {}>;
