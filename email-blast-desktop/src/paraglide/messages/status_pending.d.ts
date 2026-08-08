export { status_pending as "status.pending" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_PendingInputs = {};
/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Status_PendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_pending: ((inputs?: Status_PendingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_PendingInputs, {
    locale?: "en" | "id";
}, {}>;
