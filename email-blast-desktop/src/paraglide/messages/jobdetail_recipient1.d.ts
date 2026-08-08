export { jobdetail_recipient1 as "jobDetail.recipient" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Recipient1Inputs = {};
/**
* | output |
* | --- |
* | "Recipient" |
*
* @param {Jobdetail_Recipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_recipient1: ((inputs?: Jobdetail_Recipient1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Recipient1Inputs, {
    locale?: "en" | "id";
}, {}>;
