export { compose_templatelabel1 as "compose.templateLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Templatelabel1Inputs = {};
/**
* | output |
* | --- |
* | "Letter or certificate template" |
*
* @param {Compose_Templatelabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_templatelabel1: ((inputs?: Compose_Templatelabel1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Templatelabel1Inputs, {
    locale?: "en" | "id";
}, {}>;
