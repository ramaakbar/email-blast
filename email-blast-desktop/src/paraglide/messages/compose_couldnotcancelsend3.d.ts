export { compose_couldnotcancelsend3 as "compose.couldNotCancelSend" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Couldnotcancelsend3Inputs = {};
/**
* | output |
* | --- |
* | "Could not cancel the send." |
*
* @param {Compose_Couldnotcancelsend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_couldnotcancelsend3: ((inputs?: Compose_Couldnotcancelsend3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Couldnotcancelsend3Inputs, {
    locale?: "en" | "id";
}, {}>;
