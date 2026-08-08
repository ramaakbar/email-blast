export { jobdetail_startedduration2 as "jobDetail.startedDuration" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Startedduration2Inputs = {};
/**
* | output |
* | --- |
* | "Started / Duration" |
*
* @param {Jobdetail_Startedduration2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_startedduration2: ((inputs?: Jobdetail_Startedduration2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Startedduration2Inputs, {
    locale?: "en" | "id";
}, {}>;
