export { compose_livepreview1 as "compose.livePreview" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Livepreview1Inputs = {};
/**
* | output |
* | --- |
* | "Live preview" |
*
* @param {Compose_Livepreview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_livepreview1: ((inputs?: Compose_Livepreview1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Livepreview1Inputs, {
    locale?: "en" | "id";
}, {}>;
