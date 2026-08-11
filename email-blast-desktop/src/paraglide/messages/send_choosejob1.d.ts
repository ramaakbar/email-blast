export { send_choosejob1 as "send.chooseJob" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Choosejob1Inputs = {};
/**
* | output |
* | --- |
* | "Choose a Generate Job…" |
*
* @param {Send_Choosejob1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_choosejob1: ((inputs?: Send_Choosejob1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Choosejob1Inputs, {
    locale?: "en" | "id";
}, {}>;
