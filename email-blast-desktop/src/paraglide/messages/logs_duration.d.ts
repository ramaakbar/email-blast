export { logs_duration as "logs.duration" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_DurationInputs = {};
/**
* | output |
* | --- |
* | "Duration" |
*
* @param {Logs_DurationInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_duration: ((inputs?: Logs_DurationInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_DurationInputs, {
    locale?: "en" | "id";
}, {}>;
