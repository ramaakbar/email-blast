export { sendjob_entersender2 as "sendJob.enterSender" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Entersender2Inputs = {};
/**
* | output |
* | --- |
* | "Enter the sender name and address." |
*
* @param {Sendjob_Entersender2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_entersender2: ((inputs?: Sendjob_Entersender2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Entersender2Inputs, {
    locale?: "en" | "id";
}, {}>;
