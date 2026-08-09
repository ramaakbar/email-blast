export { smtp_defaultsenderaddress2 as "smtp.defaultSenderAddress" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Defaultsenderaddress2Inputs = {};
/**
* | output |
* | --- |
* | "Default sender address" |
*
* @param {Smtp_Defaultsenderaddress2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_defaultsenderaddress2: ((inputs?: Smtp_Defaultsenderaddress2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Defaultsenderaddress2Inputs, {
    locale?: "en" | "id";
}, {}>;
