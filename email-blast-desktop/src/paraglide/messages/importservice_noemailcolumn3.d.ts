export { importservice_noemailcolumn3 as "importService.noEmailColumn" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importservice_Noemailcolumn3Inputs = {};
/**
* | output |
* | --- |
* | "No recognizable email column was found. Select it in the mapping below." |
*
* @param {Importservice_Noemailcolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importservice_noemailcolumn3: ((inputs?: Importservice_Noemailcolumn3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importservice_Noemailcolumn3Inputs, {
    locale?: "en" | "id";
}, {}>;
