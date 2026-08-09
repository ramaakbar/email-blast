export { messages_countone1 as "messages.countOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Countone1Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} message template" |
*
* @param {Messages_Countone1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_countone1: ((inputs: Messages_Countone1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Countone1Inputs, {
    locale?: "en" | "id";
}, {}>;
