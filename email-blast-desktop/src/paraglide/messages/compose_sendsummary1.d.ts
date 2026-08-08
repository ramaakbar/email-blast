export { compose_sendsummary1 as "compose.sendSummary" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendsummary1Inputs = {};
/**
* | output |
* | --- |
* | "Send summary" |
*
* @param {Compose_Sendsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendsummary1: ((inputs?: Compose_Sendsummary1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendsummary1Inputs, {
    locale?: "en" | "id";
}, {}>;
