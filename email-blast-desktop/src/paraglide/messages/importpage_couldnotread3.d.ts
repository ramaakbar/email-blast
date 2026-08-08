export { importpage_couldnotread3 as "importPage.couldNotRead" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Couldnotread3Inputs = {};
/**
* | output |
* | --- |
* | "Could not read the file. It may not be a valid Excel file." |
*
* @param {Importpage_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_couldnotread3: ((inputs?: Importpage_Couldnotread3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Couldnotread3Inputs, {
    locale?: "en" | "id";
}, {}>;
