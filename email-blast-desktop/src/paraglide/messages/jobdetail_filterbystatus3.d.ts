export { jobdetail_filterbystatus3 as "jobDetail.filterByStatus" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Filterbystatus3Inputs = {};
/**
* | output |
* | --- |
* | "Filter recipients by status" |
*
* @param {Jobdetail_Filterbystatus3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_filterbystatus3: ((inputs?: Jobdetail_Filterbystatus3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Filterbystatus3Inputs, {
    locale?: "en" | "id";
}, {}>;
