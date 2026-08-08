export { settingspage_title1 as "settingsPage.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Title1Inputs = {};
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Settingspage_Title1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_title1: ((inputs?: Settingspage_Title1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Title1Inputs, {
    locale?: "en" | "id";
}, {}>;
