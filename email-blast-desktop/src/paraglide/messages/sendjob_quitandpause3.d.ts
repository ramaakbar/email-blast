export { sendjob_quitandpause3 as "sendJob.quitAndPause" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Quitandpause3Inputs = {};
/**
* | output |
* | --- |
* | "Quit & Pause" |
*
* @param {Sendjob_Quitandpause3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_quitandpause3: ((inputs?: Sendjob_Quitandpause3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Quitandpause3Inputs, {
    locale?: "en" | "id";
}, {}>;
