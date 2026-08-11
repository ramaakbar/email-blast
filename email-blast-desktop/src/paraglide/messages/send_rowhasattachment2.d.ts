export { send_rowhasattachment2 as "send.rowHasAttachment" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Rowhasattachment2Inputs = {};
/**
* | output |
* | --- |
* | "Has PDF" |
*
* @param {Send_Rowhasattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_rowhasattachment2: ((inputs?: Send_Rowhasattachment2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Rowhasattachment2Inputs, {
    locale?: "en" | "id";
}, {}>;
