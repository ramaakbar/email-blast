export { importpage_columnmapping2 as "importPage.columnMapping" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Columnmapping2Inputs = {};
/**
* | output |
* | --- |
* | "Column mapping" |
*
* @param {Importpage_Columnmapping2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_columnmapping2: ((inputs?: Importpage_Columnmapping2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Columnmapping2Inputs, {
    locale?: "en" | "id";
}, {}>;
