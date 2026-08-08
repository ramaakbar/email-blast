export { recipients_title as "recipients.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_TitleInputs = {};
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Recipients_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_title: ((inputs?: Recipients_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
