export { recipients_importbatch1 as "recipients.importBatch" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Importbatch1Inputs = {};
/**
* | output |
* | --- |
* | "Import batch" |
*
* @param {Recipients_Importbatch1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_importbatch1: ((inputs?: Recipients_Importbatch1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Importbatch1Inputs, {
    locale?: "en" | "id";
}, {}>;
