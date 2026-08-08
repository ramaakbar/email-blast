export { jobdetail_template1 as "jobDetail.template" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Template1Inputs = {};
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Jobdetail_Template1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_template1: ((inputs?: Jobdetail_Template1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Template1Inputs, {
    locale?: "en" | "id";
}, {}>;
