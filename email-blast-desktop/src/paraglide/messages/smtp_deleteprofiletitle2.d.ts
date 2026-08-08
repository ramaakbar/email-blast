export { smtp_deleteprofiletitle2 as "smtp.deleteProfileTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Deleteprofiletitle2Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Smtp_Deleteprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_deleteprofiletitle2: ((inputs: Smtp_Deleteprofiletitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Deleteprofiletitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
