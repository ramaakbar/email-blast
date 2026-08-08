export { importpage_duplicatesskippedparsingone4 as "importPage.duplicatesSkippedParsingOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Duplicatesskippedparsingone4Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} duplicate already skipped during parsing." |
*
* @param {Importpage_Duplicatesskippedparsingone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_duplicatesskippedparsingone4: ((inputs: Importpage_Duplicatesskippedparsingone4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Duplicatesskippedparsingone4Inputs, {
    locale?: "en" | "id";
}, {}>;
