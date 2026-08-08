export { sendjob_onlysendingcanpause4 as "sendJob.onlySendingCanPause" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Onlysendingcanpause4Inputs = {};
/**
* | output |
* | --- |
* | "Only a sending job can be paused." |
*
* @param {Sendjob_Onlysendingcanpause4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_onlysendingcanpause4: ((inputs?: Sendjob_Onlysendingcanpause4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Onlysendingcanpause4Inputs, {
    locale?: "en" | "id";
}, {}>;
