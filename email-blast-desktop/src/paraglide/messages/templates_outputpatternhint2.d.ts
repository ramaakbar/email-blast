export { templates_outputpatternhint2 as "templates.outputPatternHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Outputpatternhint2Inputs = {};
/**
* | output |
* | --- |
* | "Generated files are named with this pattern, one per recipient." |
*
* @param {Templates_Outputpatternhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_outputpatternhint2: ((inputs?: Templates_Outputpatternhint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Outputpatternhint2Inputs, {
    locale?: "en" | "id";
}, {}>;
