export { compose_allbatches1 as "compose.allBatches" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Allbatches1Inputs = {};
/**
* | output |
* | --- |
* | "All batches" |
*
* @param {Compose_Allbatches1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_allbatches1: ((inputs?: Compose_Allbatches1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Allbatches1Inputs, {
    locale?: "en" | "id";
}, {}>;
