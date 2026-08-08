export { smtp_connectionfailed1 as "smtp.connectionFailed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Connectionfailed1Inputs = {};
/**
* | output |
* | --- |
* | "Connection failed." |
*
* @param {Smtp_Connectionfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_connectionfailed1: ((inputs?: Smtp_Connectionfailed1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Connectionfailed1Inputs, {
    locale?: "en" | "id";
}, {}>;
