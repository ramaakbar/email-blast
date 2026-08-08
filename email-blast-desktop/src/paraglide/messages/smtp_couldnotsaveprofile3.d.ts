export { smtp_couldnotsaveprofile3 as "smtp.couldNotSaveProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Couldnotsaveprofile3Inputs = {};
/**
* | output |
* | --- |
* | "Could not save the profile." |
*
* @param {Smtp_Couldnotsaveprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_couldnotsaveprofile3: ((inputs?: Smtp_Couldnotsaveprofile3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Couldnotsaveprofile3Inputs, {
    locale?: "en" | "id";
}, {}>;
