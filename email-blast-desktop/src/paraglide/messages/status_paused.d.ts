export { status_paused as "status.paused" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_PausedInputs = {};
/**
* | output |
* | --- |
* | "Paused" |
*
* @param {Status_PausedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_paused: ((inputs?: Status_PausedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_PausedInputs, {
    locale?: "en" | "id";
}, {}>;
