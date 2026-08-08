export { compose_saveasprofile2 as "compose.saveAsProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Saveasprofile2Inputs = {};
/**
* | output |
* | --- |
* | "Save as profile" |
*
* @param {Compose_Saveasprofile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_saveasprofile2: ((inputs?: Compose_Saveasprofile2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Saveasprofile2Inputs, {
    locale?: "en" | "id";
}, {}>;
