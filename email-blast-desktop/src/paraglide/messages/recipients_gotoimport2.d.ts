export { recipients_gotoimport2 as "recipients.goToImport" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Gotoimport2Inputs = {};
/**
* | output |
* | --- |
* | "Go to Import" |
*
* @param {Recipients_Gotoimport2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_gotoimport2: ((inputs?: Recipients_Gotoimport2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Gotoimport2Inputs, {
    locale?: "en" | "id";
}, {}>;
