export { compose_selectallcount2 as "compose.selectAllCount" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Selectallcount2Inputs = {
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Select all {total}" |
*
* @param {Compose_Selectallcount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_selectallcount2: ((inputs: Compose_Selectallcount2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Selectallcount2Inputs, {
    locale?: "en" | "id";
}, {}>;
