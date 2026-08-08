export { compose_email as "compose.email" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_EmailInputs = {};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Compose_EmailInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_email: ((inputs?: Compose_EmailInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_EmailInputs, {
    locale?: "en" | "id";
}, {}>;
