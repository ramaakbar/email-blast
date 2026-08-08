export { jobdetail_nomatchsearch3 as "jobDetail.noMatchSearch" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Nomatchsearch3Inputs = {};
/**
* | output |
* | --- |
* | "No recipients match your search" |
*
* @param {Jobdetail_Nomatchsearch3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_nomatchsearch3: ((inputs?: Jobdetail_Nomatchsearch3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Nomatchsearch3Inputs, {
    locale?: "en" | "id";
}, {}>;
