export { smtp_identityhint1 as "smtp.identityHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Identityhint1Inputs = {};
/**
* | output |
* | --- |
* | "The send step prefills these from the profile; each job can still override them." |
*
* @param {Smtp_Identityhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_identityhint1: ((inputs?: Smtp_Identityhint1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Identityhint1Inputs, {
    locale?: "en" | "id";
}, {}>;
