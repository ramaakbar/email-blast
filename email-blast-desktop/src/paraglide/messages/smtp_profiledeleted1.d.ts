export { smtp_profiledeleted1 as "smtp.profileDeleted" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Profiledeleted1Inputs = {};
/**
* | output |
* | --- |
* | "Profile deleted." |
*
* @param {Smtp_Profiledeleted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_profiledeleted1: ((inputs?: Smtp_Profiledeleted1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Profiledeleted1Inputs, {
    locale?: "en" | "id";
}, {}>;
