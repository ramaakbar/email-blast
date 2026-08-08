export { compose_generatedpdfscount2 as "compose.generatedPdfsCount" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Generatedpdfscount2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} generated PDFs" |
*
* @param {Compose_Generatedpdfscount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_generatedpdfscount2: ((inputs: Compose_Generatedpdfscount2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Generatedpdfscount2Inputs, {
    locale?: "en" | "id";
}, {}>;
