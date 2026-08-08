export { jobdetail_searchplaceholder2 as "jobDetail.searchPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Searchplaceholder2Inputs = {};
/**
* | output |
* | --- |
* | "Search recipient name or email…" |
*
* @param {Jobdetail_Searchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_searchplaceholder2: ((inputs?: Jobdetail_Searchplaceholder2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Searchplaceholder2Inputs, {
    locale?: "en" | "id";
}, {}>;
