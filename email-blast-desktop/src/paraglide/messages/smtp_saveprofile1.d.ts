export { smtp_saveprofile1 as "smtp.saveProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Saveprofile1Inputs = {};
/**
* | output |
* | --- |
* | "Save profile" |
*
* @param {Smtp_Saveprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_saveprofile1: ((inputs?: Smtp_Saveprofile1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Saveprofile1Inputs, {
    locale?: "en" | "id";
}, {}>;
