export { generate_jobnolongerexists3 as "generate.jobNoLongerExists" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Jobnolongerexists3Inputs = {};
/**
* | output |
* | --- |
* | "This generate job no longer exists." |
*
* @param {Generate_Jobnolongerexists3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_jobnolongerexists3: ((inputs?: Generate_Jobnolongerexists3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Jobnolongerexists3Inputs, {
    locale?: "en" | "id";
}, {}>;
