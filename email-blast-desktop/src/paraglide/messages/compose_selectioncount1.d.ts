export { compose_selectioncount1 as "compose.selectionCount" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Selectioncount1Inputs = {
    selected: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{selected} selected · {total} matching" |
*
* @param {Compose_Selectioncount1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_selectioncount1: ((inputs: Compose_Selectioncount1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Selectioncount1Inputs, {
    locale?: "en" | "id";
}, {}>;
