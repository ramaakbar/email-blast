export { recipients_noemailaddress2 as "recipients.noEmailAddress" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Noemailaddress2Inputs = {};
/**
* | output |
* | --- |
* | "No email address" |
*
* @param {Recipients_Noemailaddress2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_noemailaddress2: ((inputs?: Recipients_Noemailaddress2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Noemailaddress2Inputs, {
    locale?: "en" | "id";
}, {}>;
