export { importpage_rowsskippednonameother5 as "importPage.rowsSkippedNoNameOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Rowsskippednonameother5Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} rows skipped: the name column was empty for them." |
*
* @param {Importpage_Rowsskippednonameother5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_rowsskippednonameother5: ((inputs: Importpage_Rowsskippednonameother5Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Rowsskippednonameother5Inputs, {
    locale?: "en" | "id";
}, {}>;
