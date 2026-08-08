export { compose_writesubjecttocontinue3 as "compose.writeSubjectToContinue" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Writesubjecttocontinue3Inputs = {};
/**
* | output |
* | --- |
* | "Write a subject to continue" |
*
* @param {Compose_Writesubjecttocontinue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_writesubjecttocontinue3: ((inputs?: Compose_Writesubjecttocontinue3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Writesubjecttocontinue3Inputs, {
    locale?: "en" | "id";
}, {}>;
