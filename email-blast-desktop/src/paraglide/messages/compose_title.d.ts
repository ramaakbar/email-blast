export { compose_title as "compose.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_TitleInputs = {};
/**
* | output |
* | --- |
* | "Compose" |
*
* @param {Compose_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_title: ((inputs?: Compose_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
