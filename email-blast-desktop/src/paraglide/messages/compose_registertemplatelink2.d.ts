export { compose_registertemplatelink2 as "compose.registerTemplateLink" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Registertemplatelink2Inputs = {};
/**
* | output |
* | --- |
* | "Register a template" |
*
* @param {Compose_Registertemplatelink2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_registertemplatelink2: ((inputs?: Compose_Registertemplatelink2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Registertemplatelink2Inputs, {
    locale?: "en" | "id";
}, {}>;
