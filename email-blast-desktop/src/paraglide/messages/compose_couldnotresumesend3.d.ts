export { compose_couldnotresumesend3 as "compose.couldNotResumeSend" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Couldnotresumesend3Inputs = {};
/**
* | output |
* | --- |
* | "Could not resume the send." |
*
* @param {Compose_Couldnotresumesend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_couldnotresumesend3: ((inputs?: Compose_Couldnotresumesend3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Couldnotresumesend3Inputs, {
    locale?: "en" | "id";
}, {}>;
