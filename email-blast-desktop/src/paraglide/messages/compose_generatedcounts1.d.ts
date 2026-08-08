export { compose_generatedcounts1 as "compose.generatedCounts" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Generatedcounts1Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    pending: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{generated} generated · {failed} failed · {pending} pending" |
*
* @param {Compose_Generatedcounts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_generatedcounts1: ((inputs: Compose_Generatedcounts1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Generatedcounts1Inputs, {
    locale?: "en" | "id";
}, {}>;
