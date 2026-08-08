export { smtp_noprofilesdescription2 as "smtp.noProfilesDescription" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Noprofilesdescription2Inputs = {};
/**
* | output |
* | --- |
* | "Save your SMTP server details once (e.g. Gmail with an app password) and reuse them for every campaign." |
*
* @param {Smtp_Noprofilesdescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_noprofilesdescription2: ((inputs?: Smtp_Noprofilesdescription2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Noprofilesdescription2Inputs, {
    locale?: "en" | "id";
}, {}>;
