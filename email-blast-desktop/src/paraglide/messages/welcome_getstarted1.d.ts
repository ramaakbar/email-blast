export { welcome_getstarted1 as "welcome.getStarted" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Getstarted1Inputs = {};
/**
* | output |
* | --- |
* | "Get Started" |
*
* @param {Welcome_Getstarted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_getstarted1: ((inputs?: Welcome_Getstarted1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Getstarted1Inputs, {
    locale?: "en" | "id";
}, {}>;
