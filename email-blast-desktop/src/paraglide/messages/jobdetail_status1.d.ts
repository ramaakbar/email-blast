export { jobdetail_status1 as "jobDetail.status" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Status1Inputs = {};
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Jobdetail_Status1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_status1: ((inputs?: Jobdetail_Status1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Status1Inputs, {
    locale?: "en" | "id";
}, {}>;
