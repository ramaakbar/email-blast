export { importpage_importedtoastother3 as "importPage.importedToastOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importedtoastother3Inputs = {
    imported: NonNullable<unknown>;
    duplicatesSkipped: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Imported {imported} recipients. {duplicatesSkipped} duplicates skipped." |
*
* @param {Importpage_Importedtoastother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importedtoastother3: ((inputs: Importpage_Importedtoastother3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importedtoastother3Inputs, {
    locale?: "en" | "id";
}, {}>;
