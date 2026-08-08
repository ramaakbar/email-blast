export { smtp_leaveblanktokeep3 as "smtp.leaveBlankToKeep" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Leaveblanktokeep3Inputs = {};
/**
* | output |
* | --- |
* | "Leave blank to keep the current one" |
*
* @param {Smtp_Leaveblanktokeep3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_leaveblanktokeep3: ((inputs?: Smtp_Leaveblanktokeep3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Leaveblanktokeep3Inputs, {
    locale?: "en" | "id";
}, {}>;
