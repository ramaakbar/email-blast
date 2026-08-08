export { compose_sendingratehint2 as "compose.sendingRateHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendingratehint2Inputs = {};
/**
* | output |
* | --- |
* | "Applies live - a running job picks up changes without restarting." |
*
* @param {Compose_Sendingratehint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendingratehint2: ((inputs?: Compose_Sendingratehint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendingratehint2Inputs, {
    locale?: "en" | "id";
}, {}>;
