export { recipients_emailmustcontainat3 as "recipients.emailMustContainAt" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Emailmustcontainat3Inputs = {};
/**
* | output |
* | --- |
* | "Email must contain @." |
*
* @param {Recipients_Emailmustcontainat3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_emailmustcontainat3: ((inputs?: Recipients_Emailmustcontainat3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Emailmustcontainat3Inputs, {
    locale?: "en" | "id";
}, {}>;
