export { jobdetail_inline1 as "jobDetail.inline" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Inline1Inputs = {};
/**
* | output |
* | --- |
* | "(inline)" |
*
* @param {Jobdetail_Inline1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_inline1: ((inputs?: Jobdetail_Inline1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Inline1Inputs, {
    locale?: "en" | "id";
}, {}>;
