export { logs_nojobsmatchfilters3 as "logs.noJobsMatchFilters" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Nojobsmatchfilters3Inputs = {};
/**
* | output |
* | --- |
* | "No jobs match your filters" |
*
* @param {Logs_Nojobsmatchfilters3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_nojobsmatchfilters3: ((inputs?: Logs_Nojobsmatchfilters3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Nojobsmatchfilters3Inputs, {
    locale?: "en" | "id";
}, {}>;
