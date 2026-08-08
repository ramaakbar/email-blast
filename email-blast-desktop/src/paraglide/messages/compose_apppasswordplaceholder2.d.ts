export { compose_apppasswordplaceholder2 as "compose.appPasswordPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Apppasswordplaceholder2Inputs = {};
/**
* | output |
* | --- |
* | "16-character app password" |
*
* @param {Compose_Apppasswordplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_apppasswordplaceholder2: ((inputs?: Compose_Apppasswordplaceholder2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Apppasswordplaceholder2Inputs, {
    locale?: "en" | "id";
}, {}>;
