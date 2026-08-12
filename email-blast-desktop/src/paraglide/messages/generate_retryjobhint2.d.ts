export { generate_retryjobhint2 as "generate.retryJobHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Retryjobhint2Inputs = {};
/**
* | output |
* | --- |
* | "Pre-fill the workspace with this job's recipients and template" |
*
* @param {Generate_Retryjobhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_retryjobhint2: ((inputs?: Generate_Retryjobhint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Retryjobhint2Inputs, {
    locale?: "en" | "id";
}, {}>;
