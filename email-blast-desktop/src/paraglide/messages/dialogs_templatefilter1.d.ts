export { dialogs_templatefilter1 as "dialogs.templateFilter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Dialogs_Templatefilter1Inputs = {};
/**
* | output |
* | --- |
* | "Template" |
*
* @param {Dialogs_Templatefilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const dialogs_templatefilter1: ((inputs?: Dialogs_Templatefilter1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Dialogs_Templatefilter1Inputs, {
    locale?: "en" | "id";
}, {}>;
