export { compose_unknownslothint2 as "compose.unknownSlotHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Unknownslothint2Inputs = {};
/**
* | output |
* | --- |
* | "No selected recipient has this field. Fix the placeholder or the recipients' data - sending would fail for everyone." |
*
* @param {Compose_Unknownslothint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_unknownslothint2: ((inputs?: Compose_Unknownslothint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Unknownslothint2Inputs, {
    locale?: "en" | "id";
}, {}>;
