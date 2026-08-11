export { send_filterwithoutattachment2 as "send.filterWithoutAttachment" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Filterwithoutattachment2Inputs = {};
/**
* | output |
* | --- |
* | "Without attachment" |
*
* @param {Send_Filterwithoutattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_filterwithoutattachment2: ((inputs?: Send_Filterwithoutattachment2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Filterwithoutattachment2Inputs, {
    locale?: "en" | "id";
}, {}>;
