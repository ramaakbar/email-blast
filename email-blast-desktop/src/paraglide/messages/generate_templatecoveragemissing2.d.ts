export { generate_templatecoveragemissing2 as "generate.templateCoverageMissing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Templatecoveragemissing2Inputs = {
    missing: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{missing} of {count} recipients routed to this template are missing data for:" |
*
* @param {Generate_Templatecoveragemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_templatecoveragemissing2: ((inputs: Generate_Templatecoveragemissing2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Templatecoveragemissing2Inputs, {
    locale?: "en" | "id";
}, {}>;
