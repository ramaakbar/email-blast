export { generate_routingcolumnsuggested2 as "generate.routingColumnSuggested" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Routingcolumnsuggested2Inputs = {
    column: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{column} (suggested)" |
*
* @param {Generate_Routingcolumnsuggested2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_routingcolumnsuggested2: ((inputs: Generate_Routingcolumnsuggested2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Routingcolumnsuggested2Inputs, {
    locale?: "en" | "id";
}, {}>;
