export { messages_saveascreated2 as "messages.saveAsCreated" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Saveascreated2Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Saved as template \"{name}\"." |
*
* @param {Messages_Saveascreated2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_saveascreated2: ((inputs: Messages_Saveascreated2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Saveascreated2Inputs, {
    locale?: "en" | "id";
}, {}>;
