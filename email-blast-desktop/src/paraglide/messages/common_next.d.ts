export { common_next as "common.next" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_NextInputs = {};
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Common_NextInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_next: ((inputs?: Common_NextInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_NextInputs, {
    locale?: "en" | "id";
}, {}>;
