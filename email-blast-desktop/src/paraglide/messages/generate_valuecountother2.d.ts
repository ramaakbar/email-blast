export { generate_valuecountother2 as "generate.valueCountOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Valuecountother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipients" |
*
* @param {Generate_Valuecountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_valuecountother2: ((inputs: Generate_Valuecountother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Valuecountother2Inputs, {
    locale?: "en" | "id";
}, {}>;
