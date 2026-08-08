export { compose_searchplaceholder1 as "compose.searchPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Searchplaceholder1Inputs = {};
/**
* | output |
* | --- |
* | "Search name, email, or any field…" |
*
* @param {Compose_Searchplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_searchplaceholder1: ((inputs?: Compose_Searchplaceholder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Searchplaceholder1Inputs, {
    locale?: "en" | "id";
}, {}>;
