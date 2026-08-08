export { jobdetail_searcharia2 as "jobDetail.searchAria" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Searcharia2Inputs = {};
/**
* | output |
* | --- |
* | "Search recipients of this job" |
*
* @param {Jobdetail_Searcharia2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_searcharia2: ((inputs?: Jobdetail_Searcharia2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Searcharia2Inputs, {
    locale?: "en" | "id";
}, {}>;
