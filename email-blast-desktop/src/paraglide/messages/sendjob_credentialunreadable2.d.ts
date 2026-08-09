export { sendjob_credentialunreadable2 as "sendJob.credentialUnreadable" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Credentialunreadable2Inputs = {};
/**
* | output |
* | --- |
* | "The stored SMTP credentials for this job could not be decrypted. Re-enter them or recreate the job." |
*
* @param {Sendjob_Credentialunreadable2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_credentialunreadable2: ((inputs?: Sendjob_Credentialunreadable2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Credentialunreadable2Inputs, {
    locale?: "en" | "id";
}, {}>;
