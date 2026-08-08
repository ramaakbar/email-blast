export { validation_smtphostrequired2 as "validation.smtpHostRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Smtphostrequired2Inputs = {};
/**
* | output |
* | --- |
* | "SMTP host is required." |
*
* @param {Validation_Smtphostrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_smtphostrequired2: ((inputs?: Validation_Smtphostrequired2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Smtphostrequired2Inputs, {
    locale?: "en" | "id";
}, {}>;
