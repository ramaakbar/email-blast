export { importpage_rolemetadata2 as "importPage.roleMetadata" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Rolemetadata2Inputs = {};
/**
* | output |
* | --- |
* | "Metadata" |
*
* @param {Importpage_Rolemetadata2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_rolemetadata2: ((inputs?: Importpage_Rolemetadata2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Rolemetadata2Inputs, {
    locale?: "en" | "id";
}, {}>;
