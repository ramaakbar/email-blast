export { compose_choosetemplatefirst2 as "compose.chooseTemplateFirst" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Choosetemplatefirst2Inputs = {};
/**
* | output |
* | --- |
* | "Go back and choose a template first." |
*
* @param {Compose_Choosetemplatefirst2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_choosetemplatefirst2: ((inputs?: Compose_Choosetemplatefirst2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Choosetemplatefirst2Inputs, {
    locale?: "en" | "id";
}, {}>;
