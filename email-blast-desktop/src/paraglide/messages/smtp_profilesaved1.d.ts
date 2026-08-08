export { smtp_profilesaved1 as "smtp.profileSaved" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Profilesaved1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Profile \"{name}\" saved." |
*
* @param {Smtp_Profilesaved1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_profilesaved1: ((inputs: Smtp_Profilesaved1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Profilesaved1Inputs, {
    locale?: "en" | "id";
}, {}>;
