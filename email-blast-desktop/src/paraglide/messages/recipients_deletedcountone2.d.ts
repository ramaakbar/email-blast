export { recipients_deletedcountone2 as "recipients.deletedCountOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Deletedcountone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Deleted {count} recipient." |
*
* @param {Recipients_Deletedcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_deletedcountone2: ((inputs: Recipients_Deletedcountone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Deletedcountone2Inputs, {
    locale?: "en" | "id";
}, {}>;
