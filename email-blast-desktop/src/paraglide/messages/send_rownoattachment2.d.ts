export { send_rownoattachment2 as "send.rowNoAttachment" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Rownoattachment2Inputs = {};
/**
* | output |
* | --- |
* | "No PDF" |
*
* @param {Send_Rownoattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_rownoattachment2: ((inputs?: Send_Rownoattachment2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Rownoattachment2Inputs, {
    locale?: "en" | "id";
}, {}>;
