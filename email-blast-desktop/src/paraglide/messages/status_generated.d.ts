export { status_generated as "status.generated" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Status_GeneratedInputs = {};
/**
* | output |
* | --- |
* | "Generated" |
*
* @param {Status_GeneratedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const status_generated: ((inputs?: Status_GeneratedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Status_GeneratedInputs, {
    locale?: "en" | "id";
}, {}>;
