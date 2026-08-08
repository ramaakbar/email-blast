export { compose_sender as "compose.sender" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_SenderInputs = {};
/**
* | output |
* | --- |
* | "Sender" |
*
* @param {Compose_SenderInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sender: ((inputs?: Compose_SenderInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_SenderInputs, {
    locale?: "en" | "id";
}, {}>;
