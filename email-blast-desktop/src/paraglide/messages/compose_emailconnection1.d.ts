export { compose_emailconnection1 as "compose.emailConnection" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Emailconnection1Inputs = {};
/**
* | output |
* | --- |
* | "Email connection" |
*
* @param {Compose_Emailconnection1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_emailconnection1: ((inputs?: Compose_Emailconnection1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Emailconnection1Inputs, {
    locale?: "en" | "id";
}, {}>;
