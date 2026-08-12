export { fontsservice_invalidfontfile3 as "fontsService.invalidFontFile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Fontsservice_Invalidfontfile3Inputs = {};
/**
* | output |
* | --- |
* | "That is not a readable TTF/OTF font file." |
*
* @param {Fontsservice_Invalidfontfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const fontsservice_invalidfontfile3: ((inputs?: Fontsservice_Invalidfontfile3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Fontsservice_Invalidfontfile3Inputs, {
    locale?: "en" | "id";
}, {}>;
