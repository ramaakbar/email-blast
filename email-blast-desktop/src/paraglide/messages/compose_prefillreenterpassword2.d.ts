export { compose_prefillreenterpassword2 as "compose.prefillReenterPassword" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Prefillreenterpassword2Inputs = {};
/**
* | output |
* | --- |
* | "Re-enter the app password to send again - passwords never leave this app." |
*
* @param {Compose_Prefillreenterpassword2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_prefillreenterpassword2: ((inputs?: Compose_Prefillreenterpassword2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Prefillreenterpassword2Inputs, {
    locale?: "en" | "id";
}, {}>;
