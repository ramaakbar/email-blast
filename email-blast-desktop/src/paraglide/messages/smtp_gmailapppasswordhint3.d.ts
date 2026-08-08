export { smtp_gmailapppasswordhint3 as "smtp.gmailAppPasswordHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Gmailapppasswordhint3Inputs = {};
/**
* | output |
* | --- |
* | "Gmail: generate a 16-character app password with 2-step verification enabled." |
*
* @param {Smtp_Gmailapppasswordhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_gmailapppasswordhint3: ((inputs?: Smtp_Gmailapppasswordhint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Gmailapppasswordhint3Inputs, {
    locale?: "en" | "id";
}, {}>;
