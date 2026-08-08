export { templates_imageslotshint2 as "templates.imageSlotsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Imageslotshint2Inputs = {};
/**
* | output |
* | --- |
* | "Enter the slot names the certificate needs, e.g. nama, instansi." |
*
* @param {Templates_Imageslotshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_imageslotshint2: ((inputs?: Templates_Imageslotshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Imageslotshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
