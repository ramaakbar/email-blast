export { sendjob_nofailedrecipients3 as "sendJob.noFailedRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Nofailedrecipients3Inputs = {};
/**
* | output |
* | --- |
* | "No failed recipients to retry." |
*
* @param {Sendjob_Nofailedrecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_nofailedrecipients3: ((inputs?: Sendjob_Nofailedrecipients3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Nofailedrecipients3Inputs, {
    locale?: "en" | "id";
}, {}>;
