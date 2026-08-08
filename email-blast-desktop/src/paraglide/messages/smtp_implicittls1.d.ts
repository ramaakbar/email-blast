export { smtp_implicittls1 as "smtp.implicitTls" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Implicittls1Inputs = {};
/**
* | output |
* | --- |
* | "Implicit TLS" |
*
* @param {Smtp_Implicittls1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_implicittls1: ((inputs?: Smtp_Implicittls1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Implicittls1Inputs, {
    locale?: "en" | "id";
}, {}>;
