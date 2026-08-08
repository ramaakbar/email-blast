export { logs_title as "logs.title" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_TitleInputs = {};
/**
* | output |
* | --- |
* | "Logs" |
*
* @param {Logs_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_title: ((inputs?: Logs_TitleInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_TitleInputs, {
    locale?: "en" | "id";
}, {}>;
