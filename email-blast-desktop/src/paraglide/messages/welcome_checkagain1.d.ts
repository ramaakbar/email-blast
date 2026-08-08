export { welcome_checkagain1 as "welcome.checkAgain" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Checkagain1Inputs = {};
/**
* | output |
* | --- |
* | "Check Again" |
*
* @param {Welcome_Checkagain1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_checkagain1: ((inputs?: Welcome_Checkagain1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Checkagain1Inputs, {
    locale?: "en" | "id";
}, {}>;
