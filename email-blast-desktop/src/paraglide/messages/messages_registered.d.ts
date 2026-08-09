export { messages_registered as "messages.registered" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_RegisteredInputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Message template \"{name}\" saved." |
*
* @param {Messages_RegisteredInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_registered: ((inputs: Messages_RegisteredInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_RegisteredInputs, {
    locale?: "en" | "id";
}, {}>;
