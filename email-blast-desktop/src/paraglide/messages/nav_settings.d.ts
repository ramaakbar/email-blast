export { nav_settings as "nav.settings" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_SettingsInputs = {};
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Nav_SettingsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const nav_settings: ((inputs?: Nav_SettingsInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_SettingsInputs, {
    locale?: "en" | "id";
}, {}>;
