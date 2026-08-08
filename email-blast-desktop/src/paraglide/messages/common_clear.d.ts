export { common_clear as "common.clear" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_ClearInputs = {};
/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Common_ClearInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_clear: ((inputs?: Common_ClearInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_ClearInputs, {
    locale?: "en" | "id";
}, {}>;
