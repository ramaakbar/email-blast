export { smtp_createhint1 as "smtp.createHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Createhint1Inputs = {};
/**
* | output |
* | --- |
* | "Save your SMTP server details to reuse in every campaign." |
*
* @param {Smtp_Createhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_createhint1: ((inputs?: Smtp_Createhint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Createhint1Inputs, {
    locale?: "en" | "id";
}, {}>;
