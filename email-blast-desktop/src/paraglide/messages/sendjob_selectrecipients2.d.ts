export { sendjob_selectrecipients2 as "sendJob.selectRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Selectrecipients2Inputs = {};
/**
* | output |
* | --- |
* | "Select at least one recipient to send to." |
*
* @param {Sendjob_Selectrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_selectrecipients2: ((inputs?: Sendjob_Selectrecipients2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Selectrecipients2Inputs, {
    locale?: "en" | "id";
}, {}>;
