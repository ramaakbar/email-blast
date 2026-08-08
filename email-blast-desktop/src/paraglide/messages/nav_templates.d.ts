export { nav_templates as "nav.templates" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_TemplatesInputs = {};
/**
* | output |
* | --- |
* | "Templates" |
*
* @param {Nav_TemplatesInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_templates: ((inputs?: Nav_TemplatesInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_TemplatesInputs, {
    locale?: "en" | "id";
}, {}>;
