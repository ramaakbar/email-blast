export { common_save as "common.save" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_SaveInputs = {};
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Common_SaveInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_save: ((inputs?: Common_SaveInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_SaveInputs, {
    locale?: "en" | "id";
}, {}>;
