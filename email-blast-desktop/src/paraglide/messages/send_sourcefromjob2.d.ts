export { send_sourcefromjob2 as "send.sourceFromJob" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Sourcefromjob2Inputs = {};
/**
* | output |
* | --- |
* | "From a Generate Job" |
*
* @param {Send_Sourcefromjob2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_sourcefromjob2: ((inputs?: Send_Sourcefromjob2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Sourcefromjob2Inputs, {
    locale?: "en" | "id";
}, {}>;
