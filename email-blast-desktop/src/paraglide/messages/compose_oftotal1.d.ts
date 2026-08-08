export { compose_oftotal1 as "compose.ofTotal" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Oftotal1Inputs = {
    current: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{current} of {total}" |
*
* @param {Compose_Oftotal1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_oftotal1: ((inputs: Compose_Oftotal1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Oftotal1Inputs, {
    locale?: "en" | "id";
}, {}>;
