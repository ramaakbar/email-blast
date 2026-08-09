export { common_close as "common.close" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_CloseInputs = {};
/**
* | output |
* | --- |
* | "Close" |
*
* @param {Common_CloseInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_close: ((inputs?: Common_CloseInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_CloseInputs, {
    locale?: "en" | "id";
}, {}>;
