export { compose_sentwithfailures2 as "compose.sentWithFailures" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sentwithfailures2Inputs = {
    sent: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{sent} sent, {failed} failed. Retry the failures below." |
*
* @param {Compose_Sentwithfailures2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sentwithfailures2: ((inputs: Compose_Sentwithfailures2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sentwithfailures2Inputs, {
    locale?: "en" | "id";
}, {}>;
