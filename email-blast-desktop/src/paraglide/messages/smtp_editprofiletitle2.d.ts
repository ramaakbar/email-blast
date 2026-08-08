export { smtp_editprofiletitle2 as "smtp.editProfileTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Editprofiletitle2Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Edit \"{name}\"" |
*
* @param {Smtp_Editprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_editprofiletitle2: ((inputs: Smtp_Editprofiletitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Editprofiletitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
