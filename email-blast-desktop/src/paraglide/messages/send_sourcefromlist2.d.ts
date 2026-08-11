export { send_sourcefromlist2 as "send.sourceFromList" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Sourcefromlist2Inputs = {};
/**
* | output |
* | --- |
* | "From the imported list" |
*
* @param {Send_Sourcefromlist2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_sourcefromlist2: ((inputs?: Send_Sourcefromlist2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Sourcefromlist2Inputs, {
    locale?: "en" | "id";
}, {}>;
