export { compose_steptemplate1 as "compose.stepTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Steptemplate1Inputs = {};
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Compose_Steptemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_steptemplate1: ((inputs?: Compose_Steptemplate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Steptemplate1Inputs, {
    locale?: "en" | "id";
}, {}>;
