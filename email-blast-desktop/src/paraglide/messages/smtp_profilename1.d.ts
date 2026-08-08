export { smtp_profilename1 as "smtp.profileName" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Profilename1Inputs = {};
/**
* | output |
* | --- |
* | "Profile name" |
*
* @param {Smtp_Profilename1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_profilename1: ((inputs?: Smtp_Profilename1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Profilename1Inputs, {
    locale?: "en" | "id";
}, {}>;
