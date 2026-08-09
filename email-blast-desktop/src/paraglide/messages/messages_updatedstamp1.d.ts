export { messages_updatedstamp1 as "messages.updatedStamp" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Updatedstamp1Inputs = {
    stamp: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Edited {stamp}" |
*
* @param {Messages_Updatedstamp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_updatedstamp1: ((inputs: Messages_Updatedstamp1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Updatedstamp1Inputs, {
    locale?: "en" | "id";
}, {}>;
