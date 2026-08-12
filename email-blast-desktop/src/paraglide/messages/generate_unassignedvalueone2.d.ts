export { generate_unassignedvalueone2 as "generate.unassignedValueOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Unassignedvalueone2Inputs = {
    value: NonNullable<unknown>;
    count: NonNullable<unknown>;
    names: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "\"{value}\" - {count} recipient: {names}" |
*
* @param {Generate_Unassignedvalueone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_unassignedvalueone2: ((inputs: Generate_Unassignedvalueone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Unassignedvalueone2Inputs, {
    locale?: "en" | "id";
}, {}>;
