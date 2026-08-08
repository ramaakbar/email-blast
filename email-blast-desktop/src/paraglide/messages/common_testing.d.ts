export { common_testing as "common.testing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_TestingInputs = {};
/**
* | output |
* | --- |
* | "Testing…" |
*
* @param {Common_TestingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_testing: ((inputs?: Common_TestingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_TestingInputs, {
    locale?: "en" | "id";
}, {}>;
