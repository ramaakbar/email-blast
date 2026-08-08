export { templates_rescanconfirm1 as "templates.rescanConfirm" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Rescanconfirm1Inputs = {};
/**
* | output |
* | --- |
* | "Replace the slots below with the file's placeholders?" |
*
* @param {Templates_Rescanconfirm1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_rescanconfirm1: ((inputs?: Templates_Rescanconfirm1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Rescanconfirm1Inputs, {
    locale?: "en" | "id";
}, {}>;
