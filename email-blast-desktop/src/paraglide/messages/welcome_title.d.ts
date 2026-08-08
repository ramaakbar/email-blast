export { welcome_title as "welcome.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Welcome_TitleInputs = {};
/**
* | output |
* | --- |
* | "Welcome to Email Blast" |
*
* @param {Welcome_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const welcome_title: ((inputs?: Welcome_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Welcome_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
