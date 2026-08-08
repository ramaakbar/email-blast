export { compose_selectallonpage3 as "compose.selectAllOnPage" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Selectallonpage3Inputs = {};
/**
* | output |
* | --- |
* | "Select all on this page" |
*
* @param {Compose_Selectallonpage3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_selectallonpage3: ((inputs?: Compose_Selectallonpage3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Selectallonpage3Inputs, {
    locale?: "en" | "id";
}, {}>;
