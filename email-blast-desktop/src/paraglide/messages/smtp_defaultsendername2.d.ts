export { smtp_defaultsendername2 as "smtp.defaultSenderName" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Defaultsendername2Inputs = {};
/**
* | output |
* | --- |
* | "Default sender name" |
*
* @param {Smtp_Defaultsendername2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_defaultsendername2: ((inputs?: Smtp_Defaultsendername2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Defaultsendername2Inputs, {
    locale?: "en" | "id";
}, {}>;
