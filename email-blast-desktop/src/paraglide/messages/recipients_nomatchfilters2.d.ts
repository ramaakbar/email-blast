export { recipients_nomatchfilters2 as "recipients.noMatchFilters" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Nomatchfilters2Inputs = {};
/**
* | output |
* | --- |
* | "No recipients match your filters" |
*
* @param {Recipients_Nomatchfilters2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_nomatchfilters2: ((inputs?: Recipients_Nomatchfilters2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Nomatchfilters2Inputs, {
    locale?: "en" | "id";
}, {}>;
