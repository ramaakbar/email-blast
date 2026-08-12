export { dialogs_fontfilter1 as "dialogs.fontFilter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Dialogs_Fontfilter1Inputs = {};
/**
* | output |
* | --- |
* | "Font" |
*
* @param {Dialogs_Fontfilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const dialogs_fontfilter1: ((inputs?: Dialogs_Fontfilter1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Dialogs_Fontfilter1Inputs, {
    locale?: "en" | "id";
}, {}>;
