export { templates_registered as "templates.registered" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_RegisteredInputs = {};
/**
* | output |
* | --- |
* | "Registered" |
*
* @param {Templates_RegisteredInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_registered: ((inputs?: Templates_RegisteredInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_RegisteredInputs, {
    locale?: "en" | "id";
}, {}>;
