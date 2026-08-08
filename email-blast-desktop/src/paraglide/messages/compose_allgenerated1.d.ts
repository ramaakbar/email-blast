export { compose_allgenerated1 as "compose.allGenerated" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Allgenerated1Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "All {count} PDFs generated." |
*
* @param {Compose_Allgenerated1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_allgenerated1: ((inputs: Compose_Allgenerated1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Allgenerated1Inputs, {
    locale?: "en" | "id";
}, {}>;
