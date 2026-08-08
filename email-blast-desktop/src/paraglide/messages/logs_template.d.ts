export { logs_template as "logs.template" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_TemplateInputs = {};
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Logs_TemplateInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_template: ((inputs?: Logs_TemplateInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_TemplateInputs, {
    locale?: "en" | "id";
}, {}>;
