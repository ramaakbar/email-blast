export { smtp_apppassword1 as "smtp.appPassword" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Apppassword1Inputs = {};
/**
* | output |
* | --- |
* | "App password" |
*
* @param {Smtp_Apppassword1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_apppassword1: ((inputs?: Smtp_Apppassword1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Apppassword1Inputs, {
    locale?: "en" | "id";
}, {}>;
