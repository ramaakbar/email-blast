export { status_cancelled as "status.cancelled" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_CancelledInputs = {};
/**
* | output |
* | --- |
* | "Cancelled" |
*
* @param {Status_CancelledInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_cancelled: ((inputs?: Status_CancelledInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_CancelledInputs, {
    locale?: "en" | "id";
}, {}>;
