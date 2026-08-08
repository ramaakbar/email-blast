export { compose_stepsmtp1 as "compose.stepSmtp" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Stepsmtp1Inputs = {};
/**
* | output |
* | --- |
* | "SMTP" |
*
* @param {Compose_Stepsmtp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_stepsmtp1: ((inputs?: Compose_Stepsmtp1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Stepsmtp1Inputs, {
    locale?: "en" | "id";
}, {}>;
