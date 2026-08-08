export { jobdetail_backtologs3 as "jobDetail.backToLogs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Backtologs3Inputs = {};
/**
* | output |
* | --- |
* | "Back to Logs" |
*
* @param {Jobdetail_Backtologs3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_backtologs3: ((inputs?: Jobdetail_Backtologs3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Backtologs3Inputs, {
    locale?: "en" | "id";
}, {}>;
