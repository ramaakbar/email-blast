export { nav_compose as "nav.compose" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_ComposeInputs = {};
/**
* | output |
* | --- |
* | "Compose" |
*
* @param {Nav_ComposeInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_compose: ((inputs?: Nav_ComposeInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_ComposeInputs, {
    locale?: "en" | "id";
}, {}>;
