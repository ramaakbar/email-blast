export { logs_filterbystatus2 as "logs.filterByStatus" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Filterbystatus2Inputs = {};
/**
* | output |
* | --- |
* | "Filter by status" |
*
* @param {Logs_Filterbystatus2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_filterbystatus2: ((inputs?: Logs_Filterbystatus2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Filterbystatus2Inputs, {
    locale?: "en" | "id";
}, {}>;
