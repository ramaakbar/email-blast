export { compose_allcovered1 as "compose.allCovered" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Allcovered1Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "All {count} selected recipients have data for every required slot." |
*
* @param {Compose_Allcovered1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_allcovered1: ((inputs: Compose_Allcovered1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Allcovered1Inputs, {
    locale?: "en" | "id";
}, {}>;
