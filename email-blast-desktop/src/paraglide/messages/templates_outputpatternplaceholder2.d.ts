export { templates_outputpatternplaceholder2 as "templates.outputPatternPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Outputpatternplaceholder2Inputs = {
    no: NonNullable<unknown>;
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "e.g. LOA_{no}_{name}.pdf" |
*
* @param {Templates_Outputpatternplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_outputpatternplaceholder2: ((inputs: Templates_Outputpatternplaceholder2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Outputpatternplaceholder2Inputs, {
    locale?: "en" | "id";
}, {}>;
