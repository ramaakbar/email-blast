export { smtp_couldnotloadprofiles3 as "smtp.couldNotLoadProfiles" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Couldnotloadprofiles3Inputs = {};
/**
* | output |
* | --- |
* | "Could not load SMTP profiles." |
*
* @param {Smtp_Couldnotloadprofiles3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_couldnotloadprofiles3: ((inputs?: Smtp_Couldnotloadprofiles3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Couldnotloadprofiles3Inputs, {
    locale?: "en" | "id";
}, {}>;
