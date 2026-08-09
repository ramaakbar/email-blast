export { messages_bodyhint1 as "messages.bodyHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Bodyhint1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Recipient fields like {name} come from your imported recipients and are filled in at send time." |
*
* @param {Messages_Bodyhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_bodyhint1: ((inputs: Messages_Bodyhint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Bodyhint1Inputs, {
    locale?: "en" | "id";
}, {}>;
