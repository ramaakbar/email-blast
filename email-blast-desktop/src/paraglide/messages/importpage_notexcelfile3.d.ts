export { importpage_notexcelfile3 as "importPage.notExcelFile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Notexcelfile3Inputs = {
    fileName: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "\"{fileName}\" is not an Excel file. Choose a .xlsx or .xls file." |
*
* @param {Importpage_Notexcelfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_notexcelfile3: ((inputs: Importpage_Notexcelfile3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Notexcelfile3Inputs, {
    locale?: "en" | "id";
}, {}>;
