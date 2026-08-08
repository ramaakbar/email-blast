export { importpage_gotorecipients3 as "importPage.goToRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Gotorecipients3Inputs = {};
/**
* | output |
* | --- |
* | "Go to Recipients" |
*
* @param {Importpage_Gotorecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_gotorecipients3: ((inputs?: Importpage_Gotorecipients3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Gotorecipients3Inputs, {
    locale?: "en" | "id";
}, {}>;
