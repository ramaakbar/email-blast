export { compose_gotoimport2 as "compose.goToImport" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Gotoimport2Inputs = {};
/**
* | output |
* | --- |
* | "Go to Import" |
*
* @param {Compose_Gotoimport2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_gotoimport2: ((inputs?: Compose_Gotoimport2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Gotoimport2Inputs, {
    locale?: "en" | "id";
}, {}>;
