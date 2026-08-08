export { smtp_title as "smtp.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_TitleInputs = {};
/**
* | output |
* | --- |
* | "SMTP profiles" |
*
* @param {Smtp_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_title: ((inputs?: Smtp_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
