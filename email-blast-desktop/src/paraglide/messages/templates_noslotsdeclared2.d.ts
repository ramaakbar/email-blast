export { templates_noslotsdeclared2 as "templates.noSlotsDeclared" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Noslotsdeclared2Inputs = {};
/**
* | output |
* | --- |
* | "No slots declared." |
*
* @param {Templates_Noslotsdeclared2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_noslotsdeclared2: ((inputs?: Templates_Noslotsdeclared2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Noslotsdeclared2Inputs, {
    locale?: "en" | "id";
}, {}>;
