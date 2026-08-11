export { send_preflighthint1 as "send.preflightHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Preflighthint1Inputs = {};
/**
* | output |
* | --- |
* | "The pre-flight checks the SMTP connection before the first email goes out." |
*
* @param {Send_Preflighthint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_preflighthint1: ((inputs?: Send_Preflighthint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Preflighthint1Inputs, {
    locale?: "en" | "id";
}, {}>;
