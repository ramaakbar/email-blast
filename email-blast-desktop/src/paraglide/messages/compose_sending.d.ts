export { compose_sending as "compose.sending" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_SendingInputs = {};
/**
* | output |
* | --- |
* | "Sending…" |
*
* @param {Compose_SendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sending: ((inputs?: Compose_SendingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_SendingInputs, {
    locale?: "en" | "id";
}, {}>;
