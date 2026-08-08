export { compose_apppasswordlabel2 as "compose.appPasswordLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Apppasswordlabel2Inputs = {};
/**
* | output |
* | --- |
* | "App password" |
*
* @param {Compose_Apppasswordlabel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_apppasswordlabel2: ((inputs?: Compose_Apppasswordlabel2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Apppasswordlabel2Inputs, {
    locale?: "en" | "id";
}, {}>;
