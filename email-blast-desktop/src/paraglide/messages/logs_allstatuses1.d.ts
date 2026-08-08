export { logs_allstatuses1 as "logs.allStatuses" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Allstatuses1Inputs = {};
/**
* | output |
* | --- |
* | "All statuses" |
*
* @param {Logs_Allstatuses1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_allstatuses1: ((inputs?: Logs_Allstatuses1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Allstatuses1Inputs, {
    locale?: "en" | "id";
}, {}>;
