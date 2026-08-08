export { status_completed as "status.completed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_CompletedInputs = {};
/**
* | output |
* | --- |
* | "Completed" |
*
* @param {Status_CompletedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_completed: ((inputs?: Status_CompletedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_CompletedInputs, {
    locale?: "en" | "id";
}, {}>;
