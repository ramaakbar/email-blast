export { logs_started as "logs.started" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_StartedInputs = {};
/**
* | output |
* | --- |
* | "Started" |
*
* @param {Logs_StartedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_started: ((inputs?: Logs_StartedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_StartedInputs, {
    locale?: "en" | "id";
}, {}>;
