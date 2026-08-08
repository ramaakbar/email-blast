export { compose_savedprofile1 as "compose.savedProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Savedprofile1Inputs = {};
/**
* | output |
* | --- |
* | "Saved profile" |
*
* @param {Compose_Savedprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_savedprofile1: ((inputs?: Compose_Savedprofile1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Savedprofile1Inputs, {
    locale?: "en" | "id";
}, {}>;
