export { send_filterwithattachment2 as "send.filterWithAttachment" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Filterwithattachment2Inputs = {};
/**
* | output |
* | --- |
* | "With attachment" |
*
* @param {Send_Filterwithattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_filterwithattachment2: ((inputs?: Send_Filterwithattachment2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Filterwithattachment2Inputs, {
    locale?: "en" | "id";
}, {}>;
