export { send_jobrecipients1 as "send.jobRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Jobrecipients1Inputs = {};
/**
* | output |
* | --- |
* | "Recipients of this job" |
*
* @param {Send_Jobrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_jobrecipients1: ((inputs?: Send_Jobrecipients1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Jobrecipients1Inputs, {
    locale?: "en" | "id";
}, {}>;
