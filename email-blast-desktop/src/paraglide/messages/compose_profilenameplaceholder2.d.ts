export { compose_profilenameplaceholder2 as "compose.profileNamePlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Profilenameplaceholder2Inputs = {};
/**
* | output |
* | --- |
* | "Profile name, e.g. Gmail utama" |
*
* @param {Compose_Profilenameplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_profilenameplaceholder2: ((inputs?: Compose_Profilenameplaceholder2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Profilenameplaceholder2Inputs, {
    locale?: "en" | "id";
}, {}>;
