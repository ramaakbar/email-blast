export { sendjob_norecipientsexist3 as "sendJob.noRecipientsExist" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Norecipientsexist3Inputs = {};
/**
* | output |
* | --- |
* | "None of the selected recipients still exist." |
*
* @param {Sendjob_Norecipientsexist3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_norecipientsexist3: ((inputs?: Sendjob_Norecipientsexist3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Norecipientsexist3Inputs, {
    locale?: "en" | "id";
}, {}>;
