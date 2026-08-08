export { importpage_importedtoastone3 as "importPage.importedToastOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importedtoastone3Inputs = {
    imported: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Imported {imported} recipients. {duplicatesSkipped} duplicate skipped." |
*
* @param {Importpage_Importedtoastone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importedtoastone3: ((inputs: Importpage_Importedtoastone3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importedtoastone3Inputs, {
    locale?: "en" | "id";
}, {}>;
