export { common_resume as "common.resume" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_ResumeInputs = {};
/**
* | output |
* | --- |
* | "Resume" |
*
* @param {Common_ResumeInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_resume: ((inputs?: Common_ResumeInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_ResumeInputs, {
    locale?: "en" | "id";
}, {}>;
