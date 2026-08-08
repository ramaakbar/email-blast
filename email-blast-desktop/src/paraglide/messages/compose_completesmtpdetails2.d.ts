export { compose_completesmtpdetails2 as "compose.completeSmtpDetails" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Completesmtpdetails2Inputs = {};
/**
* | output |
* | --- |
* | "Complete the SMTP and sender details" |
*
* @param {Compose_Completesmtpdetails2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_completesmtpdetails2: ((inputs?: Compose_Completesmtpdetails2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Completesmtpdetails2Inputs, {
    locale?: "en" | "id";
}, {}>;
