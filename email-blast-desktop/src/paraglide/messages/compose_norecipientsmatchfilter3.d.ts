export { compose_norecipientsmatchfilter3 as "compose.noRecipientsMatchFilter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Norecipientsmatchfilter3Inputs = {};
/**
* | output |
* | --- |
* | "No recipients match this filter" |
*
* @param {Compose_Norecipientsmatchfilter3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_norecipientsmatchfilter3: ((inputs?: Compose_Norecipientsmatchfilter3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Norecipientsmatchfilter3Inputs, {
    locale?: "en" | "id";
}, {}>;
