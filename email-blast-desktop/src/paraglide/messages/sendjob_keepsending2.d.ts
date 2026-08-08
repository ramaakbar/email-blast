export { sendjob_keepsending2 as "sendJob.keepSending" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Keepsending2Inputs = {};
/**
* | output |
* | --- |
* | "Keep Sending" |
*
* @param {Sendjob_Keepsending2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_keepsending2: ((inputs?: Sendjob_Keepsending2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Keepsending2Inputs, {
    locale?: "en" | "id";
}, {}>;
