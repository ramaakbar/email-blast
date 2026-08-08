export { common_dismiss as "common.dismiss" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_DismissInputs = {};
/**
* | output |
* | --- |
* | "Dismiss" |
*
* @param {Common_DismissInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_dismiss: ((inputs?: Common_DismissInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_DismissInputs, {
    locale?: "en" | "id";
}, {}>;
