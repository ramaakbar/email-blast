export { compose_perrecipientlog2 as "compose.perRecipientLog" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Perrecipientlog2Inputs = {};
/**
* | output |
* | --- |
* | "Per-recipient log" |
*
* @param {Compose_Perrecipientlog2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_perrecipientlog2: ((inputs?: Compose_Perrecipientlog2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Perrecipientlog2Inputs, {
    locale?: "en" | "id";
}, {}>;
