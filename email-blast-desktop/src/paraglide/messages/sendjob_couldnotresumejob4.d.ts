export { sendjob_couldnotresumejob4 as "sendJob.couldNotResumeJob" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Couldnotresumejob4Inputs = {};
/**
* | output |
* | --- |
* | "Could not resume this job." |
*
* @param {Sendjob_Couldnotresumejob4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_couldnotresumejob4: ((inputs?: Sendjob_Couldnotresumejob4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Couldnotresumejob4Inputs, {
    locale?: "en" | "id";
}, {}>;
