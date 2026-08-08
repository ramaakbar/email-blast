export { recipients_imported as "recipients.imported" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_ImportedInputs = {};
/**
* | output |
* | --- |
* | "Imported" |
*
* @param {Recipients_ImportedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_imported: ((inputs?: Recipients_ImportedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_ImportedInputs, {
    locale?: "en" | "id";
}, {}>;
