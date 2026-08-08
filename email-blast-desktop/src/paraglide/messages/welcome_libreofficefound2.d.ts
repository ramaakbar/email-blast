export { welcome_libreofficefound2 as "welcome.libreOfficeFound" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Libreofficefound2Inputs = {};
/**
* | output |
* | --- |
* | "LibreOffice found" |
*
* @param {Welcome_Libreofficefound2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_libreofficefound2: ((inputs?: Welcome_Libreofficefound2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Libreofficefound2Inputs, {
    locale?: "en" | "id";
}, {}>;
