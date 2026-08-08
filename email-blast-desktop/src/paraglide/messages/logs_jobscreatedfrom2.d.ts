export { logs_jobscreatedfrom2 as "logs.jobsCreatedFrom" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Jobscreatedfrom2Inputs = {};
/**
* | output |
* | --- |
* | "Jobs created from" |
*
* @param {Logs_Jobscreatedfrom2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_jobscreatedfrom2: ((inputs?: Logs_Jobscreatedfrom2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Jobscreatedfrom2Inputs, {
    locale?: "en" | "id";
}, {}>;
