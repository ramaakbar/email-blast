export { recipients_deletedcountother2 as "recipients.deletedCountOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Deletedcountother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Deleted {count} recipients." |
*
* @param {Recipients_Deletedcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_deletedcountother2: ((inputs: Recipients_Deletedcountother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Deletedcountother2Inputs, {
    locale?: "en" | "id";
}, {}>;
