export { welcome_subtitle as "welcome.subtitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_SubtitleInputs = {};
/**
* | output |
* | --- |
* | "One last check before you start sending." |
*
* @param {Welcome_SubtitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_subtitle: ((inputs?: Welcome_SubtitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_SubtitleInputs, {
    locale?: "en" | "id";
}, {}>;
