export { sendjob_onlypausedcanresume4 as "sendJob.onlyPausedCanResume" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Onlypausedcanresume4Inputs = {};
/**
* | output |
* | --- |
* | "Only a paused job can be resumed." |
*
* @param {Sendjob_Onlypausedcanresume4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_onlypausedcanresume4: ((inputs?: Sendjob_Onlypausedcanresume4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Onlypausedcanresume4Inputs, {
    locale?: "en" | "id";
}, {}>;
