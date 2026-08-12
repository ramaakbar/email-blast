export { generate_templatecoverageok2 as "generate.templateCoverageOk" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Templatecoverageok2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "All {count} recipients routed to this template have data for every required slot." |
*
* @param {Generate_Templatecoverageok2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_templatecoverageok2: ((inputs: Generate_Templatecoverageok2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Templatecoverageok2Inputs, {
    locale?: "en" | "id";
}, {}>;
