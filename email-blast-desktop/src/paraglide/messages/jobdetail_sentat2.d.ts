export { jobdetail_sentat2 as "jobDetail.sentAt" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Sentat2Inputs = {};
/**
* | output |
* | --- |
* | "Sent at" |
*
* @param {Jobdetail_Sentat2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_sentat2: ((inputs?: Jobdetail_Sentat2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Sentat2Inputs, {
    locale?: "en" | "id";
}, {}>;
