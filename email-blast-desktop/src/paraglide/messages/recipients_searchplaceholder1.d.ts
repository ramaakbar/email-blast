export { recipients_searchplaceholder1 as "recipients.searchPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Searchplaceholder1Inputs = {};
/**
* | output |
* | --- |
* | "Search name, email, phone, or any field…" |
*
* @param {Recipients_Searchplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_searchplaceholder1: ((inputs?: Recipients_Searchplaceholder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Searchplaceholder1Inputs, {
    locale?: "en" | "id";
}, {}>;
