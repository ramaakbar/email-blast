export { sendjob_generatejobmissing3 as "sendJob.generateJobMissing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Generatejobmissing3Inputs = {};
/**
* | output |
* | --- |
* | "The generate job this send references no longer exists." |
*
* @param {Sendjob_Generatejobmissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_generatejobmissing3: ((inputs?: Sendjob_Generatejobmissing3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Generatejobmissing3Inputs, {
    locale?: "en" | "id";
}, {}>;
