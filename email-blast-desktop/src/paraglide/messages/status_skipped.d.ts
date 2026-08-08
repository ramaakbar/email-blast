export { status_skipped as "status.skipped" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_SkippedInputs = {};
/**
* | output |
* | --- |
* | "Skipped" |
*
* @param {Status_SkippedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_skipped: ((inputs?: Status_SkippedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_SkippedInputs, {
    locale?: "en" | "id";
}, {}>;
