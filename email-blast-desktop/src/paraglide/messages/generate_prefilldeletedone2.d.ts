export { generate_prefilldeletedone2 as "generate.prefillDeletedOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Prefilldeletedone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} job recipient was deleted and left out of the pre-fill." |
*
* @param {Generate_Prefilldeletedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_prefilldeletedone2: ((inputs: Generate_Prefilldeletedone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Prefilldeletedone2Inputs, {
    locale?: "en" | "id";
}, {}>;
