export { generate_reopenedtitle1 as "generate.reopenedTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Reopenedtitle1Inputs = {};
/**
* | output |
* | --- |
* | "Job Results" |
*
* @param {Generate_Reopenedtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_reopenedtitle1: ((inputs?: Generate_Reopenedtitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Reopenedtitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
