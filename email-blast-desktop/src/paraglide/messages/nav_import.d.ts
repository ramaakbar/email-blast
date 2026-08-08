export { nav_import as "nav.import" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_ImportInputs = {};
/**
* | output |
* | --- |
* | "Import" |
*
* @param {Nav_ImportInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_import: ((inputs?: Nav_ImportInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_ImportInputs, {
    locale?: "en" | "id";
}, {}>;
