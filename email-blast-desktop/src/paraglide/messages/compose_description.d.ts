export { compose_description as "compose.description" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_DescriptionInputs = {};
/**
* | output |
* | --- |
* | "Pick who receives the documents, write the message, and send the emails." |
*
* @param {Compose_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_description: ((inputs?: Compose_DescriptionInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_DescriptionInputs, {
    locale?: "en" | "id";
}, {}>;
