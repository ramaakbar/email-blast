export { generatejob_unassignedtemplatevalue3 as "generateJob.unassignedTemplateValue" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Unassignedtemplatevalue3Inputs = {
    value: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Template-column value \"{value}\" is not assigned to any template." |
*
* @param {Generatejob_Unassignedtemplatevalue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_unassignedtemplatevalue3: ((inputs: Generatejob_Unassignedtemplatevalue3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Unassignedtemplatevalue3Inputs, {
    locale?: "en" | "id";
}, {}>;
