export { common_loading as "common.loading" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_LoadingInputs = {};
/**
* | output |
* | --- |
* | "Loading…" |
*
* @param {Common_LoadingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_loading: ((inputs?: Common_LoadingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_LoadingInputs, {
    locale?: "en" | "id";
}, {}>;
