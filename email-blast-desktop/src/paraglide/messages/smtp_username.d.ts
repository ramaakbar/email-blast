export { smtp_username as "smtp.username" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_UsernameInputs = {};
/**
* | output |
* | --- |
* | "Username" |
*
* @param {Smtp_UsernameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_username: ((inputs?: Smtp_UsernameInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_UsernameInputs, {
    locale?: "en" | "id";
}, {}>;
