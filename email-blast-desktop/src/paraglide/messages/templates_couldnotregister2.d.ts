export { templates_couldnotregister2 as "templates.couldNotRegister" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Couldnotregister2Inputs = {};
/**
* | output |
* | --- |
* | "Could not register the template." |
*
* @param {Templates_Couldnotregister2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_couldnotregister2: ((inputs?: Templates_Couldnotregister2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Couldnotregister2Inputs, {
    locale?: "en" | "id";
}, {}>;
