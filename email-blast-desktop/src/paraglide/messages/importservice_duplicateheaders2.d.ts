export { importservice_duplicateheaders2 as "importService.duplicateHeaders" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importservice_Duplicateheaders2Inputs = {
    headers: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Column headers {headers} appear more than once after trimming - only the first occurrence is imported." |
*
* @param {Importservice_Duplicateheaders2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importservice_duplicateheaders2: ((inputs: Importservice_Duplicateheaders2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importservice_Duplicateheaders2Inputs, {
    locale?: "en" | "id";
}, {}>;
