export { smtp_couldnotdeleteprofile3 as "smtp.couldNotDeleteProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Couldnotdeleteprofile3Inputs = {};
/**
* | output |
* | --- |
* | "Could not delete the profile." |
*
* @param {Smtp_Couldnotdeleteprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_couldnotdeleteprofile3: ((inputs?: Smtp_Couldnotdeleteprofile3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Couldnotdeleteprofile3Inputs, {
    locale?: "en" | "id";
}, {}>;
