export { compose_batchoption1 as "compose.batchOption" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Batchoption1Inputs = {
    count: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipients · {stamp}" |
*
* @param {Compose_Batchoption1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_batchoption1: ((inputs: Compose_Batchoption1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Batchoption1Inputs, {
    locale?: "en" | "id";
}, {}>;
