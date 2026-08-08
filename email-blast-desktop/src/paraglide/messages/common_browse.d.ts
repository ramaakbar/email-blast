export { common_browse as "common.browse" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_BrowseInputs = {};
/**
* | output |
* | --- |
* | "Browse…" |
*
* @param {Common_BrowseInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_browse: ((inputs?: Common_BrowseInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_BrowseInputs, {
    locale?: "en" | "id";
}, {}>;
