export { compose_norecipientshint2 as "compose.noRecipientsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Norecipientshint2Inputs = {};
/**
* | output |
* | --- |
* | "Import an Excel file first, then come back here to build a campaign." |
*
* @param {Compose_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_norecipientshint2: ((inputs?: Compose_Norecipientshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Norecipientshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
