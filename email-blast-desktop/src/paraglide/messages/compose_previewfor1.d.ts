export { compose_previewfor1 as "compose.previewFor" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Previewfor1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Preview for {name}" |
*
* @param {Compose_Previewfor1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_previewfor1: ((inputs: Compose_Previewfor1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Previewfor1Inputs, {
    locale?: "en" | "id";
}, {}>;
