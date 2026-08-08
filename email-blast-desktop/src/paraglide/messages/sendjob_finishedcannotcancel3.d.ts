export { sendjob_finishedcannotcancel3 as "sendJob.finishedCannotCancel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Finishedcannotcancel3Inputs = {};
/**
* | output |
* | --- |
* | "This job already finished; it cannot be cancelled." |
*
* @param {Sendjob_Finishedcannotcancel3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_finishedcannotcancel3: ((inputs?: Sendjob_Finishedcannotcancel3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Finishedcannotcancel3Inputs, {
    locale?: "en" | "id";
}, {}>;
