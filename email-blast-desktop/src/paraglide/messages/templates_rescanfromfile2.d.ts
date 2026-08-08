export { templates_rescanfromfile2 as "templates.rescanFromFile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Rescanfromfile2Inputs = {};
/**
* | output |
* | --- |
* | "Rescan from file" |
*
* @param {Templates_Rescanfromfile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_rescanfromfile2: ((inputs?: Templates_Rescanfromfile2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Rescanfromfile2Inputs, {
    locale?: "en" | "id";
}, {}>;
