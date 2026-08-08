export { compose_loadingpreview1 as "compose.loadingPreview" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Loadingpreview1Inputs = {};
/**
* | output |
* | --- |
* | "Loading preview…" |
*
* @param {Compose_Loadingpreview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_loadingpreview1: ((inputs?: Compose_Loadingpreview1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Loadingpreview1Inputs, {
    locale?: "en" | "id";
}, {}>;
