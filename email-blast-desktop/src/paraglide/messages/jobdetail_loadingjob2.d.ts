export { jobdetail_loadingjob2 as "jobDetail.loadingJob" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Loadingjob2Inputs = {};
/**
* | output |
* | --- |
* | "Loading job…" |
*
* @param {Jobdetail_Loadingjob2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_loadingjob2: ((inputs?: Jobdetail_Loadingjob2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Loadingjob2Inputs, {
    locale?: "en" | "id";
}, {}>;
