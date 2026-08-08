export { compose_nosavedprofileshint3 as "compose.noSavedProfilesHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Nosavedprofileshint3Inputs = {};
/**
* | output |
* | --- |
* | "No saved profiles yet - switch to \"Enter details\" and use \"Save as profile\", or add one in" |
*
* @param {Compose_Nosavedprofileshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_nosavedprofileshint3: ((inputs?: Compose_Nosavedprofileshint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Nosavedprofileshint3Inputs, {
    locale?: "en" | "id";
}, {}>;
