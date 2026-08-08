export { recipients_allbatches1 as "recipients.allBatches" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Allbatches1Inputs = {};
/**
* | output |
* | --- |
* | "All batches" |
*
* @param {Recipients_Allbatches1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_allbatches1: ((inputs?: Recipients_Allbatches1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Allbatches1Inputs, {
    locale?: "en" | "id";
}, {}>;
