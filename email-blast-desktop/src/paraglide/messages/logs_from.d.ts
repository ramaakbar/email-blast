export { logs_from as "logs.from" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_FromInputs = {};
/**
* | output |
* | --- |
* | "From" |
*
* @param {Logs_FromInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_from: ((inputs?: Logs_FromInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_FromInputs, {
    locale?: "en" | "id";
}, {}>;
