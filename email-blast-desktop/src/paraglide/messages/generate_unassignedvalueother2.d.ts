export { generate_unassignedvalueother2 as "generate.unassignedValueOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Unassignedvalueother2Inputs = {
    value: NonNullable<unknown>;
    count: NonNullable<unknown>;
    names: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "\"{value}\" - {count} recipients: {names}" |
*
* @param {Generate_Unassignedvalueother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_unassignedvalueother2: ((inputs: Generate_Unassignedvalueother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Unassignedvalueother2Inputs, {
    locale?: "en" | "id";
}, {}>;
