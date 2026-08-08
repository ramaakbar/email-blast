export { jobdetail_counts1 as "jobDetail.counts" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Counts1Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    skipped: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{sent} sent · {failed} failed · {skipped} skipped" |
*
* @param {Jobdetail_Counts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_counts1: ((inputs: Jobdetail_Counts1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Counts1Inputs, {
    locale?: "en" | "id";
}, {}>;
