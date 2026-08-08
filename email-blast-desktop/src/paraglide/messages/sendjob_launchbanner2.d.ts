export { sendjob_launchbanner2 as "sendJob.launchBanner" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Launchbanner2Inputs = {
    subject: NonNullable<unknown>;
    sent: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Send paused: {subject} - {sent} of {total} sent." |
*
* @param {Sendjob_Launchbanner2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_launchbanner2: ((inputs: Sendjob_Launchbanner2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Launchbanner2Inputs, {
    locale?: "en" | "id";
}, {}>;
