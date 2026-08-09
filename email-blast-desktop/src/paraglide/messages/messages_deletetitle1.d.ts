export { messages_deletetitle1 as "messages.deleteTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Deletetitle1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Delete message template \"{name}\"?" |
*
* @param {Messages_Deletetitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_deletetitle1: ((inputs: Messages_Deletetitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Deletetitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
