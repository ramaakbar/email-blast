export { compose_notemplatesregistered2 as "compose.noTemplatesRegistered" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Notemplatesregistered2Inputs = {};
/**
* | output |
* | --- |
* | "No templates registered yet." |
*
* @param {Compose_Notemplatesregistered2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_notemplatesregistered2: ((inputs?: Compose_Notemplatesregistered2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Notemplatesregistered2Inputs, {
    locale?: "en" | "id";
}, {}>;
