export { templates_templatesaved1 as "templates.templateSaved" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Templatesaved1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Template \"{name}\" saved." |
*
* @param {Templates_Templatesaved1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_templatesaved1: ((inputs: Templates_Templatesaved1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Templatesaved1Inputs, {
    locale?: "en" | "id";
}, {}>;
