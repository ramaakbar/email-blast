export { settingspage_outputfolder2 as "settingsPage.outputFolder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Outputfolder2Inputs = {};
/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Settingspage_Outputfolder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_outputfolder2: ((inputs?: Settingspage_Outputfolder2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Outputfolder2Inputs, {
    locale?: "en" | "id";
}, {}>;
