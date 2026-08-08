export { compose_unknownslottitleone3 as "compose.unknownSlotTitleOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Unknownslottitleone3Inputs = {
    list: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Unknown slot: {list}" |
*
* @param {Compose_Unknownslottitleone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_unknownslottitleone3: ((inputs: Compose_Unknownslottitleone3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Unknownslottitleone3Inputs, {
    locale?: "en" | "id";
}, {}>;
