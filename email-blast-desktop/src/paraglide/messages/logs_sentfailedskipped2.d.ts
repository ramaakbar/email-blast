export { logs_sentfailedskipped2 as "logs.sentFailedSkipped" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Sentfailedskipped2Inputs = {};
/**
* | output |
* | --- |
* | "Sent / Failed / Skipped" |
*
* @param {Logs_Sentfailedskipped2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_sentfailedskipped2: ((inputs?: Logs_Sentfailedskipped2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Sentfailedskipped2Inputs, {
    locale?: "en" | "id";
}, {}>;
