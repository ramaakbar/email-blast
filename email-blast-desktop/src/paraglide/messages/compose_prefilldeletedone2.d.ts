export { compose_prefilldeletedone2 as "compose.prefillDeletedOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Prefilldeletedone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} previously failed recipient was deleted." |
*
* @param {Compose_Prefilldeletedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_prefilldeletedone2: ((inputs: Compose_Prefilldeletedone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Prefilldeletedone2Inputs, {
    locale?: "en" | "id";
}, {}>;
