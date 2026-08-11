export { send_recipientsource1 as "send.recipientSource" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Recipientsource1Inputs = {};
/**
* | output |
* | --- |
* | "Recipient source" |
*
* @param {Send_Recipientsource1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_recipientsource1: ((inputs?: Send_Recipientsource1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Recipientsource1Inputs, {
    locale?: "en" | "id";
}, {}>;
