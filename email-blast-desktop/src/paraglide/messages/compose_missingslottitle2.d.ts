export { compose_missingslottitle2 as "compose.missingSlotTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Missingslottitle2Inputs = {
    list: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Some recipients are missing data for: {list}" |
*
* @param {Compose_Missingslottitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_missingslottitle2: ((inputs: Compose_Missingslottitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Missingslottitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
