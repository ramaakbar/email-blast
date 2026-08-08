export { templates_unsupportedfile1 as "templates.unsupportedFile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Unsupportedfile1Inputs = {
    fileName: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "\"{fileName}\" is not a supported template. Choose a .docx letter or a .png/.jpg/.jpeg certificate image." |
*
* @param {Templates_Unsupportedfile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_unsupportedfile1: ((inputs: Templates_Unsupportedfile1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Unsupportedfile1Inputs, {
    locale?: "en" | "id";
}, {}>;
