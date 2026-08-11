export { send_attachmentfilteraria2 as "send.attachmentFilterAria" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Attachmentfilteraria2Inputs = {};
/**
* | output |
* | --- |
* | "Filter by attachment" |
*
* @param {Send_Attachmentfilteraria2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_attachmentfilteraria2: ((inputs?: Send_Attachmentfilteraria2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Attachmentfilteraria2Inputs, {
    locale?: "en" | "id";
}, {}>;
