export { dialogs_pdffilter1 as "dialogs.pdfFilter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Dialogs_Pdffilter1Inputs = {};
/**
* | output |
* | --- |
* | "PDF" |
*
* @param {Dialogs_Pdffilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const dialogs_pdffilter1: ((inputs?: Dialogs_Pdffilter1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Dialogs_Pdffilter1Inputs, {
    locale?: "en" | "id";
}, {}>;
