export { importpage_dragdrophint3 as "importPage.dragDropHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Dragdrophint3Inputs = {};
/**
* | output |
* | --- |
* | "Drag and drop an Excel file here" |
*
* @param {Importpage_Dragdrophint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_dragdrophint3: ((inputs?: Importpage_Dragdrophint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Dragdrophint3Inputs, {
    locale?: "en" | "id";
}, {}>;
