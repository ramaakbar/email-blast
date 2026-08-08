export { compose_bodylabel1 as "compose.bodyLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Bodylabel1Inputs = {};
/**
* | output |
* | --- |
* | "HTML body - type { to insert a recipient field" |
*
* @param {Compose_Bodylabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_bodylabel1: ((inputs?: Compose_Bodylabel1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Bodylabel1Inputs, {
    locale?: "en" | "id";
}, {}>;
