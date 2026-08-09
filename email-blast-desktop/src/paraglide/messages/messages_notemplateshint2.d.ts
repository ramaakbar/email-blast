export { messages_notemplateshint2 as "messages.noTemplatesHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Notemplateshint2Inputs = {};
/**
* | output |
* | --- |
* | "Save a subject and body you reuse - picking it in a send job copies it into the job, where you can edit it freely." |
*
* @param {Messages_Notemplateshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_notemplateshint2: ((inputs?: Messages_Notemplateshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Notemplateshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
