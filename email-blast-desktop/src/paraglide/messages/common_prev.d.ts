export { common_prev as "common.prev" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_PrevInputs = {};
/**
* | output |
* | --- |
* | "Prev" |
*
* @param {Common_PrevInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_prev: ((inputs?: Common_PrevInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_PrevInputs, {
    locale?: "en" | "id";
}, {}>;
