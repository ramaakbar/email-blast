export { compose_steprecipients1 as "compose.stepRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Steprecipients1Inputs = {};
/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Compose_Steprecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_steprecipients1: ((inputs?: Compose_Steprecipients1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Steprecipients1Inputs, {
    locale?: "en" | "id";
}, {}>;
