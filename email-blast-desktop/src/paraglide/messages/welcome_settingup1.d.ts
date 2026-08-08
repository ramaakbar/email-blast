export { welcome_settingup1 as "welcome.settingUp" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_Settingup1Inputs = {};
/**
* | output |
* | --- |
* | "Setting up…" |
*
* @param {Welcome_Settingup1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_settingup1: ((inputs?: Welcome_Settingup1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_Settingup1Inputs, {
    locale?: "en" | "id";
}, {}>;
