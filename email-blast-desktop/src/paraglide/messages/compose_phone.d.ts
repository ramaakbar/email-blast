export { compose_phone as "compose.phone" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_PhoneInputs = {};
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Compose_PhoneInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_phone: ((inputs?: Compose_PhoneInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_PhoneInputs, {
    locale?: "en" | "id";
}, {}>;
