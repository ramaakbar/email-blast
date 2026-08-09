export { messages_countother1 as "messages.countOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Countother1Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} message templates" |
*
* @param {Messages_Countother1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_countother1: ((inputs: Messages_Countother1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Countother1Inputs, {
    locale?: "en" | "id";
}, {}>;
