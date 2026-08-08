export { smtp_noprofilesyet2 as "smtp.noProfilesYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Noprofilesyet2Inputs = {};
/**
* | output |
* | --- |
* | "No SMTP profiles yet" |
*
* @param {Smtp_Noprofilesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_noprofilesyet2: ((inputs?: Smtp_Noprofilesyet2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Noprofilesyet2Inputs, {
    locale?: "en" | "id";
}, {}>;
