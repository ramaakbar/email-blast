export { jobdetail_fixemail2 as "jobDetail.fixEmail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Fixemail2Inputs = {};
/**
* | output |
* | --- |
* | "Fix email" |
*
* @param {Jobdetail_Fixemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_fixemail2: ((inputs?: Jobdetail_Fixemail2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Fixemail2Inputs, {
    locale?: "en" | "id";
}, {}>;
