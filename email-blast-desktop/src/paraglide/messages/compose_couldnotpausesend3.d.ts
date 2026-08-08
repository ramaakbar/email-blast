export { compose_couldnotpausesend3 as "compose.couldNotPauseSend" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Couldnotpausesend3Inputs = {};
/**
* | output |
* | --- |
* | "Could not pause the send." |
*
* @param {Compose_Couldnotpausesend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_couldnotpausesend3: ((inputs?: Compose_Couldnotpausesend3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Couldnotpausesend3Inputs, {
    locale?: "en" | "id";
}, {}>;
