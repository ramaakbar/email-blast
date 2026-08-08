export { logs_status as "logs.status" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_StatusInputs = {};
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Logs_StatusInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_status: ((inputs?: Logs_StatusInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_StatusInputs, {
    locale?: "en" | "id";
}, {}>;
