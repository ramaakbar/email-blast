export { welcome_installwith1 as "welcome.installWith" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Installwith1Inputs = {};
/**
* | output |
* | --- |
* | "Install it with" |
*
* @param {Welcome_Installwith1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_installwith1: ((inputs?: Welcome_Installwith1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Installwith1Inputs, {
    locale?: "en" | "id";
}, {}>;
