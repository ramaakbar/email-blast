export { jobdetail_alllogs2 as "jobDetail.allLogs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Alllogs2Inputs = {};
/**
* | output |
* | --- |
* | "All logs" |
*
* @param {Jobdetail_Alllogs2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_alllogs2: ((inputs?: Jobdetail_Alllogs2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Alllogs2Inputs, {
    locale?: "en" | "id";
}, {}>;
