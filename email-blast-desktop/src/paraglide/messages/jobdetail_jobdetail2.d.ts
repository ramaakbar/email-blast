export { jobdetail_jobdetail2 as "jobDetail.jobDetail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Jobdetail2Inputs = {};
/**
* | output |
* | --- |
* | "Job detail" |
*
* @param {Jobdetail_Jobdetail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_jobdetail2: ((inputs?: Jobdetail_Jobdetail2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Jobdetail2Inputs, {
    locale?: "en" | "id";
}, {}>;
