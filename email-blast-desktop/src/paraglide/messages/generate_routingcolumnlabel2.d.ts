export { generate_routingcolumnlabel2 as "generate.routingColumnLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Routingcolumnlabel2Inputs = {};
/**
* | output |
* | --- |
* | "Route by column" |
*
* @param {Generate_Routingcolumnlabel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_routingcolumnlabel2: ((inputs?: Generate_Routingcolumnlabel2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Routingcolumnlabel2Inputs, {
    locale?: "en" | "id";
}, {}>;
