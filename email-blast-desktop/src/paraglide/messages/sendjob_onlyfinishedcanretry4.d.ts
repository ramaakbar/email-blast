export { sendjob_onlyfinishedcanretry4 as "sendJob.onlyFinishedCanRetry" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Onlyfinishedcanretry4Inputs = {};
/**
* | output |
* | --- |
* | "Only a finished job can be retried." |
*
* @param {Sendjob_Onlyfinishedcanretry4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_onlyfinishedcanretry4: ((inputs?: Sendjob_Onlyfinishedcanretry4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Onlyfinishedcanretry4Inputs, {
    locale?: "en" | "id";
}, {}>;
