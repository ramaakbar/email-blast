export { smtp_addprofile1 as "smtp.addProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Addprofile1Inputs = {};
/**
* | output |
* | --- |
* | "Add profile" |
*
* @param {Smtp_Addprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_addprofile1: ((inputs?: Smtp_Addprofile1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Addprofile1Inputs, {
    locale?: "en" | "id";
}, {}>;
