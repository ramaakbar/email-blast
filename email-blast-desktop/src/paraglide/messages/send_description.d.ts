export { send_description as "send.description" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_DescriptionInputs = {};
/**
* | output |
* | --- |
* | "Deliver a message to recipients picked from a past Generate Job or straight from the imported list." |
*
* @param {Send_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_description: ((inputs?: Send_DescriptionInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_DescriptionInputs, {
    locale?: "en" | "id";
}, {}>;
