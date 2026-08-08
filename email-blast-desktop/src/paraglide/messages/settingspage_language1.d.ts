export { settingspage_language1 as "settingsPage.language" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Language1Inputs = {};
/**
* | output |
* | --- |
* | "Language" |
*
* @param {Settingspage_Language1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_language1: ((inputs?: Settingspage_Language1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Language1Inputs, {
    locale?: "en" | "id";
}, {}>;
