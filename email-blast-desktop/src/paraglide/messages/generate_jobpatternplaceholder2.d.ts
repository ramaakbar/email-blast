export { generate_jobpatternplaceholder2 as "generate.jobPatternPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Jobpatternplaceholder2Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "e.g. BATCH_{name}.pdf" |
*
* @param {Generate_Jobpatternplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_jobpatternplaceholder2: ((inputs: Generate_Jobpatternplaceholder2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Jobpatternplaceholder2Inputs, {
    locale?: "en" | "id";
}, {}>;
