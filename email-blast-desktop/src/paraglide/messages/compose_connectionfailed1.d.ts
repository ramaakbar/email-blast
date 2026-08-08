export { compose_connectionfailed1 as "compose.connectionFailed" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Connectionfailed1Inputs = {};
/**
* | output |
* | --- |
* | "Connection failed." |
*
* @param {Compose_Connectionfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_connectionfailed1: ((inputs?: Compose_Connectionfailed1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Connectionfailed1Inputs, {
    locale?: "en" | "id";
}, {}>;
