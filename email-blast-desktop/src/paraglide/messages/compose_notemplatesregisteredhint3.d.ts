export { compose_notemplatesregisteredhint3 as "compose.noTemplatesRegisteredHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Notemplatesregisteredhint3Inputs = {};
/**
* | output |
* | --- |
* | "first, then come back." |
*
* @param {Compose_Notemplatesregisteredhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_notemplatesregisteredhint3: ((inputs?: Compose_Notemplatesregisteredhint3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Notemplatesregisteredhint3Inputs, {
    locale?: "en" | "id";
}, {}>;
