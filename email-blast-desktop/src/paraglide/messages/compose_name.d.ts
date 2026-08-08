export { compose_name as "compose.name" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_NameInputs = {};
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Compose_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_name: ((inputs?: Compose_NameInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_NameInputs, {
    locale?: "en" | "id";
}, {}>;
