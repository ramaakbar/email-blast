export { send_nogeneratejobshint3 as "send.noGenerateJobsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Nogeneratejobshint3Inputs = {};
/**
* | output |
* | --- |
* | "Generate documents first - their PDFs become the attachments this workspace sends." |
*
* @param {Send_Nogeneratejobshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_nogeneratejobshint3: ((inputs?: Send_Nogeneratejobshint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Nogeneratejobshint3Inputs, {
    locale?: "en" | "id";
}, {}>;
