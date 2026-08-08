export { smtp_passwordnotset2 as "smtp.passwordNotSet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Passwordnotset2Inputs = {};
/**
* | output |
* | --- |
* | "not set" |
*
* @param {Smtp_Passwordnotset2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_passwordnotset2: ((inputs?: Smtp_Passwordnotset2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Passwordnotset2Inputs, {
    locale?: "en" | "id";
}, {}>;
