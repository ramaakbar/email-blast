export { compose_preflighthint1 as "compose.preflightHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Preflighthint1Inputs = {};
/**
* | output |
* | --- |
* | "The pre-flight checks the SMTP connection and confirms the generated attachments before the first email goes out." |
*
* @param {Compose_Preflighthint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_preflighthint1: ((inputs?: Compose_Preflighthint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Preflighthint1Inputs, {
    locale?: "en" | "id";
}, {}>;
