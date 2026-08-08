export { jobdetail_retryallfailures3 as "jobDetail.retryAllFailures" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Retryallfailures3Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Retry All Failures ({count})" |
*
* @param {Jobdetail_Retryallfailures3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_retryallfailures3: ((inputs: Jobdetail_Retryallfailures3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Retryallfailures3Inputs, {
    locale?: "en" | "id";
}, {}>;
