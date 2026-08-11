export { send_sourcefromjobhint3 as "send.sourceFromJobHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Sourcefromjobhint3Inputs = {};
/**
* | output |
* | --- |
* | "Email previously generated PDFs without regenerating anything." |
*
* @param {Send_Sourcefromjobhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_sourcefromjobhint3: ((inputs?: Send_Sourcefromjobhint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Sourcefromjobhint3Inputs, {
    locale?: "en" | "id";
}, {}>;
