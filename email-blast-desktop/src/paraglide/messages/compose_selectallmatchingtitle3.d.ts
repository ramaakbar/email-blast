export { compose_selectallmatchingtitle3 as "compose.selectAllMatchingTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Selectallmatchingtitle3Inputs = {
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Select all {total} recipients matching the current filter" |
*
* @param {Compose_Selectallmatchingtitle3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_selectallmatchingtitle3: ((inputs: Compose_Selectallmatchingtitle3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Selectallmatchingtitle3Inputs, {
    locale?: "en" | "id";
}, {}>;
