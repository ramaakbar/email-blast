export { importpage_previewrows2 as "importPage.previewRows" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Previewrows2Inputs = {
    fileName: NonNullable<unknown>;
    shown: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{fileName} - showing {shown} of {total} rows" |
*
* @param {Importpage_Previewrows2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_previewrows2: ((inputs: Importpage_Previewrows2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Previewrows2Inputs, {
    locale?: "en" | "id";
}, {}>;
