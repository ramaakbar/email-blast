export { importservice_rowsskippedemptyname4 as "importService.rowsSkippedEmptyName" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importservice_Rowsskippedemptyname4Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} row(s) skipped because the name is empty." |
*
* @param {Importservice_Rowsskippedemptyname4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importservice_rowsskippedemptyname4: ((inputs: Importservice_Rowsskippedemptyname4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importservice_Rowsskippedemptyname4Inputs, {
    locale?: "en" | "id";
}, {}>;
