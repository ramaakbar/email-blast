export { welcome_downloadfrom1 as "welcome.downloadFrom" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Downloadfrom1Inputs = {};
/**
* | output |
* | --- |
* | "Download it from" |
*
* @param {Welcome_Downloadfrom1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_downloadfrom1: ((inputs?: Welcome_Downloadfrom1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Downloadfrom1Inputs, {
    locale?: "en" | "id";
}, {}>;
