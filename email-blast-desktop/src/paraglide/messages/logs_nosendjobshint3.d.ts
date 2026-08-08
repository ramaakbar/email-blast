export { logs_nosendjobshint3 as "logs.noSendJobsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Nosendjobshint3Inputs = {};
/**
* | output |
* | --- |
* | "Send a campaign from the compose wizard and it will appear here." |
*
* @param {Logs_Nosendjobshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_nosendjobshint3: ((inputs?: Logs_Nosendjobshint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Nosendjobshint3Inputs, {
    locale?: "en" | "id";
}, {}>;
