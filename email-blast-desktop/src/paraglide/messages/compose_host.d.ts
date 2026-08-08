export { compose_host as "compose.host" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_HostInputs = {};
/**
* | output |
* | --- |
* | "Host" |
*
* @param {Compose_HostInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_host: ((inputs?: Compose_HostInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_HostInputs, {
    locale?: "en" | "id";
}, {}>;
