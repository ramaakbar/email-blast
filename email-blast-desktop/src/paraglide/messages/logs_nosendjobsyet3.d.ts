export { logs_nosendjobsyet3 as "logs.noSendJobsYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Nosendjobsyet3Inputs = {};
/**
* | output |
* | --- |
* | "No send jobs yet" |
*
* @param {Logs_Nosendjobsyet3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_nosendjobsyet3: ((inputs?: Logs_Nosendjobsyet3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Nosendjobsyet3Inputs, {
    locale?: "en" | "id";
}, {}>;
