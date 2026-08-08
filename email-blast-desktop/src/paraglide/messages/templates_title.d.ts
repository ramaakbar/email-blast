export { templates_title as "templates.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_TitleInputs = {};
/**
* | output |
* | --- |
* | "Templates" |
*
* @param {Templates_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_title: ((inputs?: Templates_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
