export { importpage_columnmappinghint3 as "importPage.columnMappingHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Columnmappinghint3Inputs = {};
/**
* | output |
* | --- |
* | "Match each Excel column to a recipient field. Name, email, and phone can each be used once; a Template column becomes the generate-time routing key; other co..." |
*
* @param {Importpage_Columnmappinghint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_columnmappinghint3: ((inputs?: Importpage_Columnmappinghint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Columnmappinghint3Inputs, {
    locale?: "en" | "id";
}, {}>;
