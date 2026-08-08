export { status_sending as "status.sending" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_SendingInputs = {};
/**
* | output |
* | --- |
* | "Sending" |
*
* @param {Status_SendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_sending: ((inputs?: Status_SendingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_SendingInputs, {
    locale?: "en" | "id";
}, {}>;
