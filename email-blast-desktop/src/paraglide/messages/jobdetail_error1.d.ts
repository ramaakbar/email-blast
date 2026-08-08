export { jobdetail_error1 as "jobDetail.error" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Error1Inputs = {};
/**
* | output |
* | --- |
* | "Error" |
*
* @param {Jobdetail_Error1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_error1: ((inputs?: Jobdetail_Error1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Error1Inputs, {
    locale?: "en" | "id";
}, {}>;
