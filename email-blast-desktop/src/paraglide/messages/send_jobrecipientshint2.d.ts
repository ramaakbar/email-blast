export { send_jobrecipientshint2 as "send.jobRecipientsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Jobrecipientshint2Inputs = {};
/**
* | output |
* | --- |
* | "Recipients whose generation failed are flagged - they can still receive the message, without the PDF." |
*
* @param {Send_Jobrecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_jobrecipientshint2: ((inputs?: Send_Jobrecipientshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Jobrecipientshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
