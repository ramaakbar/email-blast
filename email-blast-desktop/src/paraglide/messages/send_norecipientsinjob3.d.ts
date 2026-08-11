export { send_norecipientsinjob3 as "send.noRecipientsInJob" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Norecipientsinjob3Inputs = {};
/**
* | output |
* | --- |
* | "This generate job has no recipients." |
*
* @param {Send_Norecipientsinjob3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_norecipientsinjob3: ((inputs?: Send_Norecipientsinjob3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Norecipientsinjob3Inputs, {
    locale?: "en" | "id";
}, {}>;
