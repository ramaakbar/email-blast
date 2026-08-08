export { sendjob_retriesexhausted2 as "sendJob.retriesExhausted" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Retriesexhausted2Inputs = {
    message: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Retries exhausted: {message}" |
*
* @param {Sendjob_Retriesexhausted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_retriesexhausted2: ((inputs: Sendjob_Retriesexhausted2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Retriesexhausted2Inputs, {
    locale?: "en" | "id";
}, {}>;
