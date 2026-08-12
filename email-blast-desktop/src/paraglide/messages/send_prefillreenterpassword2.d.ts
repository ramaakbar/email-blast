export { send_prefillreenterpassword2 as "send.prefillReenterPassword" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Prefillreenterpassword2Inputs = {};
/**
* | output |
* | --- |
* | "Re-enter the app password to send again - passwords never leave this app." |
*
* @param {Send_Prefillreenterpassword2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_prefillreenterpassword2: ((inputs?: Send_Prefillreenterpassword2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Prefillreenterpassword2Inputs, {
    locale?: "en" | "id";
}, {}>;
