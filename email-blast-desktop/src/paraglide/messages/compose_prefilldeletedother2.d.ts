export { compose_prefilldeletedother2 as "compose.prefillDeletedOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Prefilldeletedother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} previously failed recipients were deleted." |
*
* @param {Compose_Prefilldeletedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_prefilldeletedother2: ((inputs: Compose_Prefilldeletedother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Prefilldeletedother2Inputs, {
    locale?: "en" | "id";
}, {}>;
