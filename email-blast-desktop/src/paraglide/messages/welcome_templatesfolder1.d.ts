export { welcome_templatesfolder1 as "welcome.templatesFolder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Templatesfolder1Inputs = {};
/**
* | output |
* | --- |
* | "Templates folder" |
*
* @param {Welcome_Templatesfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_templatesfolder1: ((inputs?: Welcome_Templatesfolder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Templatesfolder1Inputs, {
    locale?: "en" | "id";
}, {}>;
