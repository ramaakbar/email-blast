export { nav_send as "nav.send" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_SendInputs = {};
/**
* | output |
* | --- |
* | "Send" |
*
* @param {Nav_SendInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_send: ((inputs?: Nav_SendInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_SendInputs, {
    locale?: "en" | "id";
}, {}>;
