export { compose_filterbybatch2 as "compose.filterByBatch" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Filterbybatch2Inputs = {};
/**
* | output |
* | --- |
* | "Filter by import batch" |
*
* @param {Compose_Filterbybatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_filterbybatch2: ((inputs?: Compose_Filterbybatch2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Filterbybatch2Inputs, {
    locale?: "en" | "id";
}, {}>;
