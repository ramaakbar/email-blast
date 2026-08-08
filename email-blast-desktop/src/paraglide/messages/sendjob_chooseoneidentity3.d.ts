export { sendjob_chooseoneidentity3 as "sendJob.chooseOneIdentity" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Chooseoneidentity3Inputs = {};
/**
* | output |
* | --- |
* | "Choose either a saved SMTP profile or enter connection details, not both." |
*
* @param {Sendjob_Chooseoneidentity3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_chooseoneidentity3: ((inputs?: Sendjob_Chooseoneidentity3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Chooseoneidentity3Inputs, {
    locale?: "en" | "id";
}, {}>;
