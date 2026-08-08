export { compose_missingslothint2 as "compose.missingSlotHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Missingslothint2Inputs = {};
/**
* | output |
* | --- |
* | "Those recipients will fail at send time while the rest of the batch continues. Fix their data to avoid failures." |
*
* @param {Compose_Missingslothint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_missingslothint2: ((inputs?: Compose_Missingslothint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Missingslothint2Inputs, {
    locale?: "en" | "id";
}, {}>;
