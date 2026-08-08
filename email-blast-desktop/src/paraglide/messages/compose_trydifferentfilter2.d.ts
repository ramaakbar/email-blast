export { compose_trydifferentfilter2 as "compose.tryDifferentFilter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Trydifferentfilter2Inputs = {};
/**
* | output |
* | --- |
* | "Try a different search or batch filter." |
*
* @param {Compose_Trydifferentfilter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_trydifferentfilter2: ((inputs?: Compose_Trydifferentfilter2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Trydifferentfilter2Inputs, {
    locale?: "en" | "id";
}, {}>;
