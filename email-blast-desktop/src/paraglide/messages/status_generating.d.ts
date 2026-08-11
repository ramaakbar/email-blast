export { status_generating as "status.generating" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_GeneratingInputs = {};
/**
* | output |
* | --- |
* | "Generating" |
*
* @param {Status_GeneratingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_generating: ((inputs?: Status_GeneratingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_GeneratingInputs, {
    locale?: "en" | "id";
}, {}>;
