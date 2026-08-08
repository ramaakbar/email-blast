export { recipients_nomatchhint2 as "recipients.noMatchHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Nomatchhint2Inputs = {};
/**
* | output |
* | --- |
* | "Try a different search or batch." |
*
* @param {Recipients_Nomatchhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_nomatchhint2: ((inputs?: Recipients_Nomatchhint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Nomatchhint2Inputs, {
    locale?: "en" | "id";
}, {}>;
