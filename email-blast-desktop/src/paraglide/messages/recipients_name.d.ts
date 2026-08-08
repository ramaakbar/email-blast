export { recipients_name as "recipients.name" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_NameInputs = {};
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Recipients_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_name: ((inputs?: Recipients_NameInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_NameInputs, {
    locale?: "en" | "id";
}, {}>;
