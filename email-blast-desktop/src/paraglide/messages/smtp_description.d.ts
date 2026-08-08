export { smtp_description as "smtp.description" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_DescriptionInputs = {};
/**
* | output |
* | --- |
* | "Saved sender identities the compose wizard can pick from. Passwords are stored locally and never shown." |
*
* @param {Smtp_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_description: ((inputs?: Smtp_DescriptionInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_DescriptionInputs, {
    locale?: "en" | "id";
}, {}>;
