export { smtp_edithint1 as "smtp.editHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Edithint1Inputs = {};
/**
* | output |
* | --- |
* | "The stored password is never shown; leave the field blank to keep it." |
*
* @param {Smtp_Edithint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_edithint1: ((inputs?: Smtp_Edithint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Edithint1Inputs, {
    locale?: "en" | "id";
}, {}>;
