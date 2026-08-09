export { messages_norecipientshint2 as "messages.noRecipientsHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Norecipientshint2Inputs = {
    slot: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Import recipients first - the {slot} autocomplete and preview use them." |
*
* @param {Messages_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_norecipientshint2: ((inputs: Messages_Norecipientshint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Norecipientshint2Inputs, {
    locale?: "en" | "id";
}, {}>;
