export { send_filterall1 as "send.filterAll" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Filterall1Inputs = {};
/**
* | output |
* | --- |
* | "All" |
*
* @param {Send_Filterall1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_filterall1: ((inputs?: Send_Filterall1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Filterall1Inputs, {
    locale?: "en" | "id";
}, {}>;
