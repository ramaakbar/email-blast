export { smtp_passwordlabel1 as "smtp.passwordLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Passwordlabel1Inputs = {};
/**
* | output |
* | --- |
* | "password" |
*
* @param {Smtp_Passwordlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_passwordlabel1: ((inputs?: Smtp_Passwordlabel1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Passwordlabel1Inputs, {
    locale?: "en" | "id";
}, {}>;
