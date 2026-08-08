export { welcome_outputfolder1 as "welcome.outputFolder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Outputfolder1Inputs = {};
/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Welcome_Outputfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_outputfolder1: ((inputs?: Welcome_Outputfolder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Outputfolder1Inputs, {
    locale?: "en" | "id";
}, {}>;
