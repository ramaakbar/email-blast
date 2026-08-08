export { jobdetail_smtp1 as "jobDetail.smtp" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Smtp1Inputs = {};
/**
* | output |
* | --- |
* | "SMTP" |
*
* @param {Jobdetail_Smtp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_smtp1: ((inputs?: Jobdetail_Smtp1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Smtp1Inputs, {
    locale?: "en" | "id";
}, {}>;
