export { common_saved as "common.saved" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_SavedInputs = {};
/**
* | output |
* | --- |
* | "Saved" |
*
* @param {Common_SavedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_saved: ((inputs?: Common_SavedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_SavedInputs, {
    locale?: "en" | "id";
}, {}>;
