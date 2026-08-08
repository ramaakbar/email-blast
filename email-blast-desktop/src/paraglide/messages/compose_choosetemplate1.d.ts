export { compose_choosetemplate1 as "compose.chooseTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Choosetemplate1Inputs = {};
/**
* | output |
* | --- |
* | "Choose a template…" |
*
* @param {Compose_Choosetemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_choosetemplate1: ((inputs?: Compose_Choosetemplate1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Choosetemplate1Inputs, {
    locale?: "en" | "id";
}, {}>;
