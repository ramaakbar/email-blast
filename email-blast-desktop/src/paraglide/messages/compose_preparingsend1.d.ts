export { compose_preparingsend1 as "compose.preparingSend" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Preparingsend1Inputs = {};
/**
* | output |
* | --- |
* | "Preparing the send…" |
*
* @param {Compose_Preparingsend1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_preparingsend1: ((inputs?: Compose_Preparingsend1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Preparingsend1Inputs, {
    locale?: "en" | "id";
}, {}>;
