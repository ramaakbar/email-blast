export { settingspage_app1 as "settingsPage.app" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_App1Inputs = {};
/**
* | output |
* | --- |
* | "App" |
*
* @param {Settingspage_App1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_app1: ((inputs?: Settingspage_App1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_App1Inputs, {
    locale?: "en" | "id";
}, {}>;
