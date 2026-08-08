export { validation_templatenamerequired2 as "validation.templateNameRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Templatenamerequired2Inputs = {};
/**
* | output |
* | --- |
* | "Template name is required." |
*
* @param {Validation_Templatenamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_templatenamerequired2: ((inputs?: Validation_Templatenamerequired2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Templatenamerequired2Inputs, {
    locale?: "en" | "id";
}, {}>;
