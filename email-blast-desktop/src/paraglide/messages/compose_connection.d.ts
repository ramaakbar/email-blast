export { compose_connection as "compose.connection" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_ConnectionInputs = {};
/**
* | output |
* | --- |
* | "Connection" |
*
* @param {Compose_ConnectionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_connection: ((inputs?: Compose_ConnectionInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_ConnectionInputs, {
    locale?: "en" | "id";
}, {}>;
