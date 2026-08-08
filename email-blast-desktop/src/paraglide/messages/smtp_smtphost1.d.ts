export { smtp_smtphost1 as "smtp.smtpHost" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Smtphost1Inputs = {};
/**
* | output |
* | --- |
* | "SMTP host" |
*
* @param {Smtp_Smtphost1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_smtphost1: ((inputs?: Smtp_Smtphost1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Smtphost1Inputs, {
    locale?: "en" | "id";
}, {}>;
