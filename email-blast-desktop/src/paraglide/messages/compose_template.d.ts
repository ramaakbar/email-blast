export { compose_template as "compose.template" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_TemplateInputs = {};
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Compose_TemplateInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_template: ((inputs?: Compose_TemplateInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_TemplateInputs, {
    locale?: "en" | "id";
}, {}>;
