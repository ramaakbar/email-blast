export { compose_nogeneratedattachments2 as "compose.noGeneratedAttachments" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Nogeneratedattachments2Inputs = {};
/**
* | output |
* | --- |
* | "No recipients have a generated attachment - go back and generate the PDFs first." |
*
* @param {Compose_Nogeneratedattachments2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_nogeneratedattachments2: ((inputs?: Compose_Nogeneratedattachments2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Nogeneratedattachments2Inputs, {
    locale?: "en" | "id";
}, {}>;
