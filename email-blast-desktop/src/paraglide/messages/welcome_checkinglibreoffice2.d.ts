export { welcome_checkinglibreoffice2 as "welcome.checkingLibreOffice" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Checkinglibreoffice2Inputs = {};
/**
* | output |
* | --- |
* | "Checking for LibreOffice..." |
*
* @param {Welcome_Checkinglibreoffice2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_checkinglibreoffice2: ((inputs?: Welcome_Checkinglibreoffice2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Checkinglibreoffice2Inputs, {
    locale?: "en" | "id";
}, {}>;
