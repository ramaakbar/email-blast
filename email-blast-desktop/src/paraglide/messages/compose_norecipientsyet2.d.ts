export { compose_norecipientsyet2 as "compose.noRecipientsYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Norecipientsyet2Inputs = {};
/**
* | output |
* | --- |
* | "No recipients yet" |
*
* @param {Compose_Norecipientsyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_norecipientsyet2: ((inputs?: Compose_Norecipientsyet2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Norecipientsyet2Inputs, {
    locale?: "en" | "id";
}, {}>;
