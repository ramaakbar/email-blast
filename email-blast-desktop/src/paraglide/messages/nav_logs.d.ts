export { nav_logs as "nav.logs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_LogsInputs = {};
/**
* | output |
* | --- |
* | "Logs" |
*
* @param {Nav_LogsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_logs: ((inputs?: Nav_LogsInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_LogsInputs, {
    locale?: "en" | "id";
}, {}>;
