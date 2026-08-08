export { compose_searchrecipients1 as "compose.searchRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Searchrecipients1Inputs = {};
/**
* | output |
* | --- |
* | "Search recipients" |
*
* @param {Compose_Searchrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_searchrecipients1: ((inputs?: Compose_Searchrecipients1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Searchrecipients1Inputs, {
    locale?: "en" | "id";
}, {}>;
