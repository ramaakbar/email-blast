export { sendjob_stillpausing2 as "sendJob.stillPausing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Stillpausing2Inputs = {};
/**
* | output |
* | --- |
* | "This job is still pausing - try again in a moment." |
*
* @param {Sendjob_Stillpausing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_stillpausing2: ((inputs?: Sendjob_Stillpausing2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Stillpausing2Inputs, {
    locale?: "en" | "id";
}, {}>;
