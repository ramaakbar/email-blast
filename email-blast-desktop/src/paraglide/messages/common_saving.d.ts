export { common_saving as "common.saving" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_SavingInputs = {};
/**
* | output |
* | --- |
* | "Saving…" |
*
* @param {Common_SavingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_saving: ((inputs?: Common_SavingInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_SavingInputs, {
    locale?: "en" | "id";
}, {}>;
