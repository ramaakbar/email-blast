export { welcome_libreofficepurpose2 as "welcome.libreOfficePurpose" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Libreofficepurpose2Inputs = {};
/**
* | output |
* | --- |
* | "Used to convert letters to PDF" |
*
* @param {Welcome_Libreofficepurpose2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_libreofficepurpose2: ((inputs?: Welcome_Libreofficepurpose2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Libreofficepurpose2Inputs, {
    locale?: "en" | "id";
}, {}>;
