export { jobdetail_nomatchhint3 as "jobDetail.noMatchHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Nomatchhint3Inputs = {};
/**
* | output |
* | --- |
* | "Try a different name, email, or status." |
*
* @param {Jobdetail_Nomatchhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_nomatchhint3: ((inputs?: Jobdetail_Nomatchhint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Nomatchhint3Inputs, {
    locale?: "en" | "id";
}, {}>;
