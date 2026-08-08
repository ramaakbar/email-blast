export { jobdetail_resume1 as "jobDetail.resume" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Resume1Inputs = {};
/**
* | output |
* | --- |
* | "Resume" |
*
* @param {Jobdetail_Resume1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_resume1: ((inputs?: Jobdetail_Resume1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Resume1Inputs, {
    locale?: "en" | "id";
}, {}>;
