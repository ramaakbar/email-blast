export { logs_description as "logs.description" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_DescriptionInputs = {};
/**
* | output |
* | --- |
* | "Every send job, most recent first - open one for the per-recipient detail." |
*
* @param {Logs_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_description: ((inputs?: Logs_DescriptionInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_DescriptionInputs, {
    locale?: "en" | "id";
}, {}>;
