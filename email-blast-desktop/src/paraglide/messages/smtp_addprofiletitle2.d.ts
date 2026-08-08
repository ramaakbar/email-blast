export { smtp_addprofiletitle2 as "smtp.addProfileTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Addprofiletitle2Inputs = {};
/**
* | output |
* | --- |
* | "Add SMTP profile" |
*
* @param {Smtp_Addprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_addprofiletitle2: ((inputs?: Smtp_Addprofiletitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Addprofiletitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
