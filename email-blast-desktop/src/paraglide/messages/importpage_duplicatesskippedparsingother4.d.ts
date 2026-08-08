export { importpage_duplicatesskippedparsingother4 as "importPage.duplicatesSkippedParsingOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Duplicatesskippedparsingother4Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} duplicates already skipped during parsing." |
*
* @param {Importpage_Duplicatesskippedparsingother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_duplicatesskippedparsingother4: ((inputs: Importpage_Duplicatesskippedparsingother4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Duplicatesskippedparsingother4Inputs, {
    locale?: "en" | "id";
}, {}>;
