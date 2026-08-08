export { sendjob_alreadysending2 as "sendJob.alreadySending" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Alreadysending2Inputs = {};
/**
* | output |
* | --- |
* | "This job is already sending." |
*
* @param {Sendjob_Alreadysending2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_alreadysending2: ((inputs?: Sendjob_Alreadysending2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Alreadysending2Inputs, {
    locale?: "en" | "id";
}, {}>;
