export { compose_slotmissingcountone3 as "compose.slotMissingCountOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Slotmissingcountone3Inputs = {
    slot: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{slot} - {count} recipient" |
*
* @param {Compose_Slotmissingcountone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_slotmissingcountone3: ((inputs: Compose_Slotmissingcountone3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Slotmissingcountone3Inputs, {
    locale?: "en" | "id";
}, {}>;
