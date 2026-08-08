export { common_back as "common.back" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_BackInputs = {};
/**
* | output |
* | --- |
* | "Back" |
*
* @param {Common_BackInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_back: ((inputs?: Common_BackInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_BackInputs, {
    locale?: "en" | "id";
}, {}>;
