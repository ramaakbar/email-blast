export { importservice_notexcel2 as "importService.notExcel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importservice_Notexcel2Inputs = {};
/**
* | output |
* | --- |
* | "Not an Excel file (.xlsx or .xls expected)" |
*
* @param {Importservice_Notexcel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importservice_notexcel2: ((inputs?: Importservice_Notexcel2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importservice_Notexcel2Inputs, {
    locale?: "en" | "id";
}, {}>;
