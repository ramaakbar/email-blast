export { generatejob_selectrecipients2 as "generateJob.selectRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Selectrecipients2Inputs = {};
/**
* | output |
* | --- |
* | "Select at least one recipient." |
*
* @param {Generatejob_Selectrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_selectrecipients2: ((inputs?: Generatejob_Selectrecipients2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Selectrecipients2Inputs, {
    locale?: "en" | "id";
}, {}>;
