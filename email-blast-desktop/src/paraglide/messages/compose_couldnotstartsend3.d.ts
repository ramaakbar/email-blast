export { compose_couldnotstartsend3 as "compose.couldNotStartSend" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Couldnotstartsend3Inputs = {};
/**
* | output |
* | --- |
* | "Could not start the send." |
*
* @param {Compose_Couldnotstartsend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_couldnotstartsend3: ((inputs?: Compose_Couldnotstartsend3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Couldnotstartsend3Inputs, {
    locale?: "en" | "id";
}, {}>;
