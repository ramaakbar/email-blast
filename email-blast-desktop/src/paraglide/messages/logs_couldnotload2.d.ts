export { logs_couldnotload2 as "logs.couldNotLoad" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Couldnotload2Inputs = {};
/**
* | output |
* | --- |
* | "Could not load the logs." |
*
* @param {Logs_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_couldnotload2: ((inputs?: Logs_Couldnotload2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Couldnotload2Inputs, {
    locale?: "en" | "id";
}, {}>;
