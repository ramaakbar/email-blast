export { importpage_rowsskippednonameone5 as "importPage.rowsSkippedNoNameOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Rowsskippednonameone5Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} row skipped: the name column was empty for it." |
*
* @param {Importpage_Rowsskippednonameone5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_rowsskippednonameone5: ((inputs: Importpage_Rowsskippednonameone5Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Rowsskippednonameone5Inputs, {
    locale?: "en" | "id";
}, {}>;
