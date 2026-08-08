export { compose_sendcounts1 as "compose.sendCounts" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendcounts1Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    pending: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{sent} sent · {failed} failed · {pending} pending" |
*
* @param {Compose_Sendcounts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendcounts1: ((inputs: Compose_Sendcounts1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendcounts1Inputs, {
    locale?: "en" | "id";
}, {}>;
