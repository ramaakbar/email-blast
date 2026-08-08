export { jobdetail_retry1 as "jobDetail.retry" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Retry1Inputs = {};
/**
* | output |
* | --- |
* | "Retry" |
*
* @param {Jobdetail_Retry1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_retry1: ((inputs?: Jobdetail_Retry1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Retry1Inputs, {
    locale?: "en" | "id";
}, {}>;
