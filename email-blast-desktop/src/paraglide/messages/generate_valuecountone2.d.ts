export { generate_valuecountone2 as "generate.valueCountOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Valuecountone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipient" |
*
* @param {Generate_Valuecountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_valuecountone2: ((inputs: Generate_Valuecountone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Valuecountone2Inputs, {
    locale?: "en" | "id";
}, {}>;
