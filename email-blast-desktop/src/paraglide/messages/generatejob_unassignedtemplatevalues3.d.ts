export { generatejob_unassignedtemplatevalues3 as "generateJob.unassignedTemplateValues" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Unassignedtemplatevalues3Inputs = {
    count: NonNullable<unknown>;
    names: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Cannot generate: {count} recipients have a template-column value that is not assigned to any template: {names}." |
*
* @param {Generatejob_Unassignedtemplatevalues3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_unassignedtemplatevalues3: ((inputs: Generatejob_Unassignedtemplatevalues3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Unassignedtemplatevalues3Inputs, {
    locale?: "en" | "id";
}, {}>;
