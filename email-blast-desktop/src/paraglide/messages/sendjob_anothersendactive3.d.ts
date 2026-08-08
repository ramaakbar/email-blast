export { sendjob_anothersendactive3 as "sendJob.anotherSendActive" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Anothersendactive3Inputs = {};
/**
* | output |
* | --- |
* | "Another send is in progress or paused. Pause or finish it first." |
*
* @param {Sendjob_Anothersendactive3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_anothersendactive3: ((inputs?: Sendjob_Anothersendactive3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Anothersendactive3Inputs, {
    locale?: "en" | "id";
}, {}>;
