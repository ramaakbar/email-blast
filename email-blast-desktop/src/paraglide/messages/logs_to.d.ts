export { logs_to as "logs.to" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_ToInputs = {};
/**
* | output |
* | --- |
* | "To" |
*
* @param {Logs_ToInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_to: ((inputs?: Logs_ToInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_ToInputs, {
    locale?: "en" | "id";
}, {}>;
