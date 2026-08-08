export { logs_resuming as "logs.resuming" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_ResumingInputs = {};
/**
* | output |
* | --- |
* | "Resuming…" |
*
* @param {Logs_ResumingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_resuming: ((inputs?: Logs_ResumingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_ResumingInputs, {
    locale?: "en" | "id";
}, {}>;
