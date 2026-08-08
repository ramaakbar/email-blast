export { logs_jobscreatedupto3 as "logs.jobsCreatedUpTo" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Jobscreatedupto3Inputs = {};
/**
* | output |
* | --- |
* | "Jobs created up to" |
*
* @param {Logs_Jobscreatedupto3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_jobscreatedupto3: ((inputs?: Logs_Jobscreatedupto3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Jobscreatedupto3Inputs, {
    locale?: "en" | "id";
}, {}>;
