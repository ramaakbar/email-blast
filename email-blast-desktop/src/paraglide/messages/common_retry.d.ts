export { common_retry as "common.retry" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_RetryInputs = {};
/**
* | output |
* | --- |
* | "Retry" |
*
* @param {Common_RetryInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_retry: ((inputs?: Common_RetryInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_RetryInputs, {
    locale?: "en" | "id";
}, {}>;
