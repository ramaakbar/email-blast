export { status_sent as "status.sent" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_SentInputs = {};
/**
* | output |
* | --- |
* | "Sent" |
*
* @param {Status_SentInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_sent: ((inputs?: Status_SentInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_SentInputs, {
    locale?: "en" | "id";
}, {}>;
