export { validation_smtpportinvalid2 as "validation.smtpPortInvalid" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Smtpportinvalid2Inputs = {};
/**
* | output |
* | --- |
* | "Port must be a whole number between 1 and 65535." |
*
* @param {Validation_Smtpportinvalid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_smtpportinvalid2: ((inputs?: Validation_Smtpportinvalid2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Smtpportinvalid2Inputs, {
    locale?: "en" | "id";
}, {}>;
