export { common_retryfailures1 as "common.retryFailures" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_Retryfailures1Inputs = {};
/**
* | output |
* | --- |
* | "Retry Failures" |
*
* @param {Common_Retryfailures1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_retryfailures1: ((inputs?: Common_Retryfailures1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_Retryfailures1Inputs, {
    locale?: "en" | "id";
}, {}>;
