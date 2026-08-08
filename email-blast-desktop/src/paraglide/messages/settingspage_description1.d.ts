export { settingspage_description1 as "settingsPage.description" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Description1Inputs = {};
/**
* | output |
* | --- |
* | "SMTP profiles, sending rate, default folders, and app information." |
*
* @param {Settingspage_Description1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_description1: ((inputs?: Settingspage_Description1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Description1Inputs, {
    locale?: "en" | "id";
}, {}>;
