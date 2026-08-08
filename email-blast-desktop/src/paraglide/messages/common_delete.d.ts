export { common_delete as "common.delete" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_DeleteInputs = {};
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Common_DeleteInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_delete: ((inputs?: Common_DeleteInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_DeleteInputs, {
    locale?: "en" | "id";
}, {}>;
