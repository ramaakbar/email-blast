export { compose_slotmissingcountother3 as "compose.slotMissingCountOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Slotmissingcountother3Inputs = {
    slot: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{slot} - {count} recipients" |
*
* @param {Compose_Slotmissingcountother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_slotmissingcountother3: ((inputs: Compose_Slotmissingcountother3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Slotmissingcountother3Inputs, {
    locale?: "en" | "id";
}, {}>;
