export { compose_unknownslotfooter2 as "compose.unknownSlotFooter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Unknownslotfooter2Inputs = {
    slot: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Unknown slot: {slot}" |
*
* @param {Compose_Unknownslotfooter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_unknownslotfooter2: ((inputs: Compose_Unknownslotfooter2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Unknownslotfooter2Inputs, {
    locale?: "en" | "id";
}, {}>;
