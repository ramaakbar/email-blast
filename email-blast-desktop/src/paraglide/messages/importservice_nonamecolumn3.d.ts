export { importservice_nonamecolumn3 as "importService.noNameColumn" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importservice_Nonamecolumn3Inputs = {};
/**
* | output |
* | --- |
* | "No recognizable name column was found. Select it in the mapping below." |
*
* @param {Importservice_Nonamecolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importservice_nonamecolumn3: ((inputs?: Importservice_Nonamecolumn3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importservice_Nonamecolumn3Inputs, {
    locale?: "en" | "id";
}, {}>;
