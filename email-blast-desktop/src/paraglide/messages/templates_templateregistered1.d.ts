export { templates_templateregistered1 as "templates.templateRegistered" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Templateregistered1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Template \"{name}\" registered." |
*
* @param {Templates_Templateregistered1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_templateregistered1: ((inputs: Templates_Templateregistered1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Templateregistered1Inputs, {
    locale?: "en" | "id";
}, {}>;
