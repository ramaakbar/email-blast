export { recipients_loadingrecipients1 as "recipients.loadingRecipients" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Loadingrecipients1Inputs = {};
/**
* | output |
* | --- |
* | "Loading recipients…" |
*
* @param {Recipients_Loadingrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_loadingrecipients1: ((inputs?: Recipients_Loadingrecipients1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Loadingrecipients1Inputs, {
    locale?: "en" | "id";
}, {}>;
