export { generate_prefilldeletedother2 as "generate.prefillDeletedOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Prefilldeletedother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} job recipients were deleted and left out of the pre-fill." |
*
* @param {Generate_Prefilldeletedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_prefilldeletedother2: ((inputs: Generate_Prefilldeletedother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Prefilldeletedother2Inputs, {
    locale?: "en" | "id";
}, {}>;
