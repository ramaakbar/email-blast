export { smtp_savechanges1 as "smtp.saveChanges" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Savechanges1Inputs = {};
/**
* | output |
* | --- |
* | "Save changes" |
*
* @param {Smtp_Savechanges1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_savechanges1: ((inputs?: Smtp_Savechanges1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Savechanges1Inputs, {
    locale?: "en" | "id";
}, {}>;
