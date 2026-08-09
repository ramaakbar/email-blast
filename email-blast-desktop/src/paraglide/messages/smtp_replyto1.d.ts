export { smtp_replyto1 as "smtp.replyTo" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Replyto1Inputs = {};
/**
* | output |
* | --- |
* | "Reply-to (optional)" |
*
* @param {Smtp_Replyto1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_replyto1: ((inputs?: Smtp_Replyto1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Replyto1Inputs, {
    locale?: "en" | "id";
}, {}>;
