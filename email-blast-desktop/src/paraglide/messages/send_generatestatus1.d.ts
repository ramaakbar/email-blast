export { send_generatestatus1 as "send.generateStatus" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Generatestatus1Inputs = {};
/**
* | output |
* | --- |
* | "Generate status" |
*
* @param {Send_Generatestatus1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_generatestatus1: ((inputs?: Send_Generatestatus1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Generatestatus1Inputs, {
    locale?: "en" | "id";
}, {}>;
