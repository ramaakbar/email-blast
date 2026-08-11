export { send_sendthese1 as "send.sendThese" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Sendthese1Inputs = {};
/**
* | output |
* | --- |
* | "Send these" |
*
* @param {Send_Sendthese1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_sendthese1: ((inputs?: Send_Sendthese1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Sendthese1Inputs, {
    locale?: "en" | "id";
}, {}>;
