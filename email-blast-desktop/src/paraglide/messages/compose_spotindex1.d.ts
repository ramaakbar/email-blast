export { compose_spotindex1 as "compose.spotIndex" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Spotindex1Inputs = {
    index: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{index} of {total}" |
*
* @param {Compose_Spotindex1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_spotindex1: ((inputs: Compose_Spotindex1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Spotindex1Inputs, {
    locale?: "en" | "id";
}, {}>;
