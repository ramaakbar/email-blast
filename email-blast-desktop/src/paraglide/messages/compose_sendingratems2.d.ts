export { compose_sendingratems2 as "compose.sendingRateMs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendingratems2Inputs = {
    ms: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{ms} ms / email" |
*
* @param {Compose_Sendingratems2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendingratems2: ((inputs: Compose_Sendingratems2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendingratems2Inputs, {
    locale?: "en" | "id";
}, {}>;
