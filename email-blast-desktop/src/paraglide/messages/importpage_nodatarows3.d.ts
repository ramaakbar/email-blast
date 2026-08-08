export { importpage_nodatarows3 as "importPage.noDataRows" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Nodatarows3Inputs = {};
/**
* | output |
* | --- |
* | "No data rows found in the first sheet." |
*
* @param {Importpage_Nodatarows3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_nodatarows3: ((inputs?: Importpage_Nodatarows3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Nodatarows3Inputs, {
    locale?: "en" | "id";
}, {}>;
