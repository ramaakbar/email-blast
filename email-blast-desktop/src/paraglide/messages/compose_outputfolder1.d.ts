export { compose_outputfolder1 as "compose.outputFolder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Outputfolder1Inputs = {};
/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Compose_Outputfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_outputfolder1: ((inputs?: Compose_Outputfolder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Outputfolder1Inputs, {
    locale?: "en" | "id";
}, {}>;
