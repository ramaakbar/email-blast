export { jobdetail_jobnotfound3 as "jobDetail.jobNotFound" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Jobnotfound3Inputs = {};
/**
* | output |
* | --- |
* | "Job not found" |
*
* @param {Jobdetail_Jobnotfound3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_jobnotfound3: ((inputs?: Jobdetail_Jobnotfound3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Jobnotfound3Inputs, {
    locale?: "en" | "id";
}, {}>;
