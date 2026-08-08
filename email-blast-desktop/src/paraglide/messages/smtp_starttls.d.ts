export { smtp_starttls as "smtp.starttls" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_StarttlsInputs = {};
/**
* | output |
* | --- |
* | "STARTTLS" |
*
* @param {Smtp_StarttlsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_starttls: ((inputs?: Smtp_StarttlsInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_StarttlsInputs, {
    locale?: "en" | "id";
}, {}>;
