export { compose_unknownslottitleother3 as "compose.unknownSlotTitleOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Unknownslottitleother3Inputs = {
    list: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Unknown slots: {list}" |
*
* @param {Compose_Unknownslottitleother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_unknownslottitleother3: ((inputs: Compose_Unknownslottitleother3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Unknownslottitleother3Inputs, {
    locale?: "en" | "id";
}, {}>;
