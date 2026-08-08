export { validation_smtpusernamerequired2 as "validation.smtpUsernameRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Smtpusernamerequired2Inputs = {};
/**
* | output |
* | --- |
* | "Username is required." |
*
* @param {Validation_Smtpusernamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_smtpusernamerequired2: ((inputs?: Validation_Smtpusernamerequired2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Smtpusernamerequired2Inputs, {
    locale?: "en" | "id";
}, {}>;
