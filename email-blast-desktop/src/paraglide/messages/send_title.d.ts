export { send_title as "send.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_TitleInputs = {};
/**
* | output |
* | --- |
* | "Send" |
*
* @param {Send_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_title: ((inputs?: Send_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
