export { importpage_importrecipients2 as "importPage.importRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Importrecipients2Inputs = {};
/**
* | output |
* | --- |
* | "Import recipients" |
*
* @param {Importpage_Importrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_importrecipients2: ((inputs?: Importpage_Importrecipients2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Importrecipients2Inputs, {
    locale?: "en" | "id";
}, {}>;
