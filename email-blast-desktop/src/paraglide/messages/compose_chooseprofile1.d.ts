export { compose_chooseprofile1 as "compose.chooseProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Chooseprofile1Inputs = {};
/**
* | output |
* | --- |
* | "Choose a profile…" |
*
* @param {Compose_Chooseprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_chooseprofile1: ((inputs?: Compose_Chooseprofile1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Chooseprofile1Inputs, {
    locale?: "en" | "id";
}, {}>;
