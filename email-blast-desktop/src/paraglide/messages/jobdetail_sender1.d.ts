export { jobdetail_sender1 as "jobDetail.sender" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Sender1Inputs = {};
/**
* | output |
* | --- |
* | "Sender" |
*
* @param {Jobdetail_Sender1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_sender1: ((inputs?: Jobdetail_Sender1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Sender1Inputs, {
    locale?: "en" | "id";
}, {}>;
