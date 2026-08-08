export { jobdetail_jobnotfoundhint4 as "jobDetail.jobNotFoundHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Jobnotfoundhint4Inputs = {};
/**
* | output |
* | --- |
* | "It may have been removed from the database." |
*
* @param {Jobdetail_Jobnotfoundhint4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_jobnotfoundhint4: ((inputs?: Jobdetail_Jobnotfoundhint4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Jobnotfoundhint4Inputs, {
    locale?: "en" | "id";
}, {}>;
