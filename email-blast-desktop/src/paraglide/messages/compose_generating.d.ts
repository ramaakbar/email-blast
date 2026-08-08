export { compose_generating as "compose.generating" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_GeneratingInputs = {};
/**
* | output |
* | --- |
* | "Generating…" |
*
* @param {Compose_GeneratingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_generating: ((inputs?: Compose_GeneratingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_GeneratingInputs, {
    locale?: "en" | "id";
}, {}>;
