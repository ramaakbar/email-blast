export { compose_pacing as "compose.pacing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_PacingInputs = {};
/**
* | output |
* | --- |
* | "Pacing" |
*
* @param {Compose_PacingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_pacing: ((inputs?: Compose_PacingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_PacingInputs, {
    locale?: "en" | "id";
}, {}>;
