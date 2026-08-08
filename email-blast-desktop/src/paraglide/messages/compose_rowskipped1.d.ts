export { compose_rowskipped1 as "compose.rowSkipped" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Rowskipped1Inputs = {};
/**
* | output |
* | --- |
* | "- skipped" |
*
* @param {Compose_Rowskipped1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_rowskipped1: ((inputs?: Compose_Rowskipped1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Rowskipped1Inputs, {
    locale?: "en" | "id";
}, {}>;
