export { send_attachment as "send.attachment" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_AttachmentInputs = {};
/**
* | output |
* | --- |
* | "Attachment" |
*
* @param {Send_AttachmentInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_attachment: ((inputs?: Send_AttachmentInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_AttachmentInputs, {
    locale?: "en" | "id";
}, {}>;
