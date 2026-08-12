export { generate_routinghint1 as "generate.routingHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Routinghint1Inputs = {};
/**
* | output |
* | --- |
* | "Pick the column whose values decide which template each recipient is generated with." |
*
* @param {Generate_Routinghint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_routinghint1: ((inputs?: Generate_Routinghint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Routinghint1Inputs, {
    locale?: "en" | "id";
}, {}>;
