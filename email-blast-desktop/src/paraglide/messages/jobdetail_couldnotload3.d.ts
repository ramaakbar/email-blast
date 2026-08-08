export { jobdetail_couldnotload3 as "jobDetail.couldNotLoad" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Couldnotload3Inputs = {};
/**
* | output |
* | --- |
* | "Could not load this job." |
*
* @param {Jobdetail_Couldnotload3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_couldnotload3: ((inputs?: Jobdetail_Couldnotload3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Couldnotload3Inputs, {
    locale?: "en" | "id";
}, {}>;
