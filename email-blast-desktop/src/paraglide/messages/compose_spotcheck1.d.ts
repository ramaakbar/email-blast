export { compose_spotcheck1 as "compose.spotCheck" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Spotcheck1Inputs = {};
/**
* | output |
* | --- |
* | "Spot-check" |
*
* @param {Compose_Spotcheck1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_spotcheck1: ((inputs?: Compose_Spotcheck1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Spotcheck1Inputs, {
    locale?: "en" | "id";
}, {}>;
