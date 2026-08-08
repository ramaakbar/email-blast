export { compose_messagelooksgood2 as "compose.messageLooksGood" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Messagelooksgood2Inputs = {};
/**
* | output |
* | --- |
* | "Message looks good" |
*
* @param {Compose_Messagelooksgood2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_messagelooksgood2: ((inputs?: Compose_Messagelooksgood2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Messagelooksgood2Inputs, {
    locale?: "en" | "id";
}, {}>;
