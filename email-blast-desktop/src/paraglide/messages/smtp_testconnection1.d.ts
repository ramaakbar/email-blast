export { smtp_testconnection1 as "smtp.testConnection" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Testconnection1Inputs = {};
/**
* | output |
* | --- |
* | "Test connection" |
*
* @param {Smtp_Testconnection1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_testconnection1: ((inputs?: Smtp_Testconnection1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Testconnection1Inputs, {
    locale?: "en" | "id";
}, {}>;
