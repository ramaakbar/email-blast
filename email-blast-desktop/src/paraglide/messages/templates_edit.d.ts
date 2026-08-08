export { templates_edit as "templates.edit" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_EditInputs = {};
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Templates_EditInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_edit: ((inputs?: Templates_EditInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_EditInputs, {
    locale?: "en" | "id";
}, {}>;
