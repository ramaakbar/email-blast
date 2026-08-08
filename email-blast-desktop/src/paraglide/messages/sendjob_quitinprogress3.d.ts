export { sendjob_quitinprogress3 as "sendJob.quitInProgress" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Quitinprogress3Inputs = {
    sent: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Send in progress - {sent} of {total} sent. The job will pause and you can resume it later from Logs." |
*
* @param {Sendjob_Quitinprogress3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_quitinprogress3: ((inputs: Sendjob_Quitinprogress3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Quitinprogress3Inputs, {
    locale?: "en" | "id";
}, {}>;
