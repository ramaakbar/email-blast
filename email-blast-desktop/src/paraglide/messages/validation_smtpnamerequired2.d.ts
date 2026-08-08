export { validation_smtpnamerequired2 as "validation.smtpNameRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Smtpnamerequired2Inputs = {};
/**
* | output |
* | --- |
* | "Profile name is required." |
*
* @param {Validation_Smtpnamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_smtpnamerequired2: ((inputs?: Validation_Smtpnamerequired2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Smtpnamerequired2Inputs, {
    locale?: "en" | "id";
}, {}>;
