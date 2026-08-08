export { dialogs_excelfilter1 as "dialogs.excelFilter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Dialogs_Excelfilter1Inputs = {};
/**
* | output |
* | --- |
* | "Excel" |
*
* @param {Dialogs_Excelfilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const dialogs_excelfilter1: ((inputs?: Dialogs_Excelfilter1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Dialogs_Excelfilter1Inputs, {
    locale?: "en" | "id";
}, {}>;
