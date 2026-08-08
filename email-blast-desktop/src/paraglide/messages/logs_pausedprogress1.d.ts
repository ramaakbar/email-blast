export { logs_pausedprogress1 as "logs.pausedProgress" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Pausedprogress1Inputs = {
    sent: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Paused - {sent} of {total} sent" |
*
* @param {Logs_Pausedprogress1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_pausedprogress1: ((inputs: Logs_Pausedprogress1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Pausedprogress1Inputs, {
    locale?: "en" | "id";
}, {}>;
