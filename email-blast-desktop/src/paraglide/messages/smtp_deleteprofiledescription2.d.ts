export { smtp_deleteprofiledescription2 as "smtp.deleteProfileDescription" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Deleteprofiledescription2Inputs = {};
/**
* | output |
* | --- |
* | "The profile and its stored password are removed from the app." |
*
* @param {Smtp_Deleteprofiledescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_deleteprofiledescription2: ((inputs?: Smtp_Deleteprofiledescription2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Deleteprofiledescription2Inputs, {
    locale?: "en" | "id";
}, {}>;
