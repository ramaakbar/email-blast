export { common_cancel as "common.cancel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_CancelInputs = {};
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Common_CancelInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_cancel: ((inputs?: Common_CancelInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_CancelInputs, {
    locale?: "en" | "id";
}, {}>;
