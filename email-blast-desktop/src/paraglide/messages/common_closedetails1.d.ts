export { common_closedetails1 as "common.closeDetails" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_Closedetails1Inputs = {};
/**
* | output |
* | --- |
* | "Close details" |
*
* @param {Common_Closedetails1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_closedetails1: ((inputs?: Common_Closedetails1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_Closedetails1Inputs, {
    locale?: "en" | "id";
}, {}>;
