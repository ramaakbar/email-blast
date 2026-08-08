export { recipients_deletedescription1 as "recipients.deleteDescription" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Deletedescription1Inputs = {};
/**
* | output |
* | --- |
* | "They will be removed from the directory. Past job history is kept." |
*
* @param {Recipients_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_deletedescription1: ((inputs?: Recipients_Deletedescription1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Deletedescription1Inputs, {
    locale?: "en" | "id";
}, {}>;
