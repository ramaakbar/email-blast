export { compose_sendingrate1 as "compose.sendingRate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendingrate1Inputs = {};
/**
* | output |
* | --- |
* | "Sending rate" |
*
* @param {Compose_Sendingrate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendingrate1: ((inputs?: Compose_Sendingrate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendingrate1Inputs, {
    locale?: "en" | "id";
}, {}>;
