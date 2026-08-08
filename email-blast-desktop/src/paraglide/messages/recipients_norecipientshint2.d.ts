export { recipients_norecipientshint2 as "recipients.noRecipientsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Norecipientshint2Inputs = {};
/**
* | output |
* | --- |
* | "Import an Excel file to fill the directory." |
*
* @param {Recipients_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_norecipientshint2: ((inputs?: Recipients_Norecipientshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Norecipientshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
