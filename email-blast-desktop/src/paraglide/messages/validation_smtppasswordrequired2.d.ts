export { validation_smtppasswordrequired2 as "validation.smtpPasswordRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Smtppasswordrequired2Inputs = {};
/**
* | output |
* | --- |
* | "App password is required." |
*
* @param {Validation_Smtppasswordrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_smtppasswordrequired2: ((inputs?: Validation_Smtppasswordrequired2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Smtppasswordrequired2Inputs, {
    locale?: "en" | "id";
}, {}>;
