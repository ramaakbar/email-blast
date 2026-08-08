export { importpage_selectnamecolumn3 as "importPage.selectNameColumn" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Selectnamecolumn3Inputs = {};
/**
* | output |
* | --- |
* | "Select a name column to import" |
*
* @param {Importpage_Selectnamecolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_selectnamecolumn3: ((inputs?: Importpage_Selectnamecolumn3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Selectnamecolumn3Inputs, {
    locale?: "en" | "id";
}, {}>;
