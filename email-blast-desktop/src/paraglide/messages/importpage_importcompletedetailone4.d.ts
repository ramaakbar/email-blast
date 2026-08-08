export { importpage_importcompletedetailone4 as "importPage.importCompleteDetailOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importcompletedetailone4Inputs = {
    imported: NonNullable<unknown>;
    fileName: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Imported {imported} recipients from {fileName}. {duplicatesSkipped} duplicate skipped." |
*
* @param {Importpage_Importcompletedetailone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importcompletedetailone4: ((inputs: Importpage_Importcompletedetailone4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importcompletedetailone4Inputs, {
    locale?: "en" | "id";
}, {}>;
