export { compose_portlabel1 as "compose.portLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Portlabel1Inputs = {};
/**
* | output |
* | --- |
* | "Port (465 = implicit TLS, else STARTTLS)" |
*
* @param {Compose_Portlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_portlabel1: ((inputs?: Compose_Portlabel1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Portlabel1Inputs, {
    locale?: "en" | "id";
}, {}>;
