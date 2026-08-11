export { send_failedgeneratetitle2 as "send.failedGenerateTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Failedgeneratetitle2Inputs = {};
/**
* | output |
* | --- |
* | "Generation failed - the message goes out without the PDF" |
*
* @param {Send_Failedgeneratetitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_failedgeneratetitle2: ((inputs?: Send_Failedgeneratetitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Failedgeneratetitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
