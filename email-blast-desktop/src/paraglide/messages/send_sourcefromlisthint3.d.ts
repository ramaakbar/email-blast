export { send_sourcefromlisthint3 as "send.sourceFromListHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Sourcefromlisthint3Inputs = {};
/**
* | output |
* | --- |
* | "A plain message with no attachments." |
*
* @param {Send_Sourcefromlisthint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_sourcefromlisthint3: ((inputs?: Send_Sourcefromlisthint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Sourcefromlisthint3Inputs, {
    locale?: "en" | "id";
}, {}>;
