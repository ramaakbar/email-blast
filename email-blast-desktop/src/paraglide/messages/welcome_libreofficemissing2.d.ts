export { welcome_libreofficemissing2 as "welcome.libreOfficeMissing" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Libreofficemissing2Inputs = {};
/**
* | output |
* | --- |
* | "LibreOffice is not installed" |
*
* @param {Welcome_Libreofficemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_libreofficemissing2: ((inputs?: Welcome_Libreofficemissing2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Libreofficemissing2Inputs, {
    locale?: "en" | "id";
}, {}>;
