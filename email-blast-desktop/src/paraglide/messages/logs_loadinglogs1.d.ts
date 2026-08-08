export { logs_loadinglogs1 as "logs.loadingLogs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_Loadinglogs1Inputs = {};
/**
* | output |
* | --- |
* | "Loading logs…" |
*
* @param {Logs_Loadinglogs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_loadinglogs1: ((inputs?: Logs_Loadinglogs1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_Loadinglogs1Inputs, {
    locale?: "en" | "id";
}, {}>;
