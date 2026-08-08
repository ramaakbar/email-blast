export { common_pause as "common.pause" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_PauseInputs = {};
/**
* | output |
* | --- |
* | "Pause" |
*
* @param {Common_PauseInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_pause: ((inputs?: Common_PauseInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_PauseInputs, {
    locale?: "en" | "id";
}, {}>;
