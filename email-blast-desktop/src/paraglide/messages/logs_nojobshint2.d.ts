export { logs_nojobshint2 as "logs.noJobsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Nojobshint2Inputs = {};
/**
* | output |
* | --- |
* | "Try a different status or date range." |
*
* @param {Logs_Nojobshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_nojobshint2: ((inputs?: Logs_Nojobshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Nojobshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
