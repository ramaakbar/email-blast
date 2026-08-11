export { send_nogeneratejobsyet3 as "send.noGenerateJobsYet" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Nogeneratejobsyet3Inputs = {};
/**
* | output |
* | --- |
* | "No generate jobs yet" |
*
* @param {Send_Nogeneratejobsyet3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_nogeneratejobsyet3: ((inputs?: Send_Nogeneratejobsyet3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Nogeneratejobsyet3Inputs, {
    locale?: "en" | "id";
}, {}>;
