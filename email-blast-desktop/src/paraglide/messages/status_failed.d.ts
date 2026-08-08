export { status_failed as "status.failed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_FailedInputs = {};
/**
* | output |
* | --- |
* | "Failed" |
*
* @param {Status_FailedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_failed: ((inputs?: Status_FailedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_FailedInputs, {
    locale?: "en" | "id";
}, {}>;
