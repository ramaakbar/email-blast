export { settingspage_about1 as "settingsPage.about" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_About1Inputs = {};
/**
* | output |
* | --- |
* | "About" |
*
* @param {Settingspage_About1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_about1: ((inputs?: Settingspage_About1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_About1Inputs, {
    locale?: "en" | "id";
}, {}>;
