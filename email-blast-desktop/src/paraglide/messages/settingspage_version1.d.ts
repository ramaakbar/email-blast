export { settingspage_version1 as "settingsPage.version" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Version1Inputs = {};
/**
* | output |
* | --- |
* | "Version" |
*
* @param {Settingspage_Version1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_version1: ((inputs?: Settingspage_Version1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Version1Inputs, {
    locale?: "en" | "id";
}, {}>;
