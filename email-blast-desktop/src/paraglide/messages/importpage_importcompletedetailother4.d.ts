export { importpage_importcompletedetailother4 as "importPage.importCompleteDetailOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importcompletedetailother4Inputs = {
    imported: NonNullable<unknown>;
    fileName: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Imported {imported} recipients from {fileName}. {duplicatesSkipped} duplicates skipped." |
*
* @param {Importpage_Importcompletedetailother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importcompletedetailother4: ((inputs: Importpage_Importcompletedetailother4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importcompletedetailother4Inputs, {
    locale?: "en" | "id";
}, {}>;
