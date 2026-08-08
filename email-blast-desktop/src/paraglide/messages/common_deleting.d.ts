export { common_deleting as "common.deleting" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_DeletingInputs = {};
/**
* | output |
* | --- |
* | "Deleting…" |
*
* @param {Common_DeletingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_deleting: ((inputs?: Common_DeletingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_DeletingInputs, {
    locale?: "en" | "id";
}, {}>;
