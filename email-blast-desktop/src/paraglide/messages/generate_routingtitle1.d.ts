export { generate_routingtitle1 as "generate.routingTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Routingtitle1Inputs = {};
/**
* | output |
* | --- |
* | "Template routing" |
*
* @param {Generate_Routingtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_routingtitle1: ((inputs?: Generate_Routingtitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Routingtitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
