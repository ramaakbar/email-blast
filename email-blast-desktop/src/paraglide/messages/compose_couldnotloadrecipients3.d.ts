export { compose_couldnotloadrecipients3 as "compose.couldNotLoadRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Couldnotloadrecipients3Inputs = {};
/**
* | output |
* | --- |
* | "Could not load recipients." |
*
* @param {Compose_Couldnotloadrecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_couldnotloadrecipients3: ((inputs?: Compose_Couldnotloadrecipients3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Couldnotloadrecipients3Inputs, {
    locale?: "en" | "id";
}, {}>;
