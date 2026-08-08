export { recipients_searcharia1 as "recipients.searchAria" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Searcharia1Inputs = {};
/**
* | output |
* | --- |
* | "Search recipients" |
*
* @param {Recipients_Searcharia1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_searcharia1: ((inputs?: Recipients_Searcharia1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Searcharia1Inputs, {
    locale?: "en" | "id";
}, {}>;
